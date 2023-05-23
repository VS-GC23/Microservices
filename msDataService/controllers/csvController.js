const fs = require('fs');
const aws = require("aws-sdk");
const path = require('path');
const csv = require('fast-csv');
const History = require("../models/History");

const create = async (req, res) => {
  console.log(req.file.body);
  const totalRecords = [];
try{
        // Enter copied or downloaded access ID and secret key here
const ID = 'ID';
const SECRET = 'SECRET';

// The name of the bucket that you have created
const BUCKET_NAME = 'csv-storage-file';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

// const params = {
//     Bucket: BUCKET_NAME,
//     CreateBucketConfiguration: {
//         // Set your region here
//         LocationConstraint: "ap-south-1"
//     }
// };

// s3.createBucket(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });

const fileContent = req.file;

    // Setting up S3 upload parameters
    const uploadparams = {
        Bucket: BUCKET_NAME,
        Key: req.file.filename, // File name you want to save as in S3
        Body: fileContent
    };

    s3.upload(uploadparams, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });


// console.log(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
//   fs.createReadStream(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
//     .pipe(csv.parse({ headers: true }))
//     .on('error', error => console.log(error(error)))
//     .on('data', row => totalRecords.push(row))
//     .on('end', async rowCount => {
//       try{
//         const history = await History.insertMany(totalRecords);
        
//         res.json(history);
//       }catch(err){
//         res.status(400).json(err);
//       }
//     });

  }catch(error){
    res.status(400).json(error)
  }
};

module.exports = create
