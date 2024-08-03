// const express = require('express');
// const router = express.Router();
// const Joi = require('joi');

// const validateRequest = require('_middleware/validate-request');
// const Role = require('_helpers/role');
// const booksService = require('./../services/books.service');
// const { CopticTranslation } = require('../models/coptic-translations.model');
// const { User } = require('../models/user.model');
// const { InquiryAnswer } = require('../models/InquiryAnswers.model');
// const { Book } = require('../models/book.modell');
// const { Mahrgan } = require('../models/mahrgan.model');
// const { Inquiry } = require('../models/inquiry.model');
// const fs = require('fs');
// const path = require('path');
// // import entire SDK
// var AWS = require('aws-sdk'); 


// const pushFileToAWS = (filePath:string, fileBuffer:any, ContentType:string) => {
//     // Set the region and access keys
//     AWS.config.update({
//         region: process.env.S3_REGION,
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     });

//     // Create a new instance of the S3 class
//     const s3 = new AWS.S3();

//     // Set the parameters for the file you want to upload
//     const params = {
//         Bucket: process.env.S3_BUCKET,
//         Key: filePath,
//         Body: fileBuffer,
//         ContentType: ContentType
//     };

//     let uploadedFileKey = '';

//     // Upload the file to S3
//     s3.upload(params, (err:any, data:any) => {
//         if (err) {
//             console.log('Error uploading file:', err);
//         } else {
//             console.log('File uploaded successfully. File location:', data.Key);
//             uploadedFileKey = data.Key;

//            return  uploadedFileKey;

//         }
//     });


// }

// async function uploadMultipleFiles(req, res, next) {
//     try {


//         const file_path = req.body.file_path;
//         let filesKeys = [];
//         if (req.files) {
//             const promises = [];
//             for (let i = 0; i < req.files.length; i++) {

//                 const extension = path.extname(req.files[i].originalname);
//                 const file_name = file_path + '/' + new Date().getTime() + extension;

//                 // Set the region and access keys
//                 AWS.config.update({
//                     region: process.env.S3_REGION,
//                     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//                     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//                 });

//                 // Create a new instance of the S3 class
//                 const s3 = new AWS.S3();

//                 // Set the parameters for the file you want to upload
//                 const params = {
//                     Bucket: process.env.S3_BUCKET,
//                     Key: file_name,
//                     Body: req.files[i].buffer,
//                     ContentType: req.files[i].mimetype
//                 };


//                 // Upload the file to S3
//                 let tt = new Promise((resolve, reject) => {
//                     s3.upload(params, (err, data) => {
//                         if (err) {
//                             res.status(400).json({ 'Error uploading file:': err.message });
//                         } else {
//                             console.log('File uploaded successfully. File location:', data.Location);

//                             filesKeys.push(data.Key)
//                             resolve();

//                         }
//                     });
//                 });



//                 promises.push(tt)

//             }

//             Promise.all(promises)
//                 .then((results) => {
//                     res.status(200).json({ "msg": 'done', filesKeys });
//                 })
//                 .catch((e) => {
//                     // handle errors here
//                 });


//         }

//         //  res.status(200).json({ "msg": 'done' , filesKeys });

//     } catch (error) {
//         res.status(400).json({ "msg": error.message });
//     }
// }
// async function uploadSingleFile(req, res, next) {
//     try {

//         const file_path = req.body.file_path;

//         if (req.file) {
//             var extension = path.extname(req.file.originalname);
//             var file_name = file_path + '/' + new Date().getTime() + extension;

//             // Set the region and access keys
//             AWS.config.update({
//                 region: process.env.S3_REGION,
//                 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//                 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//             });

//             // Cr9eate a new instance of the S3 class
//             const s3 = new AWS.S3();

//             // Set the parameters for the file you want to upload
//             const params = {
//                 Bucket: process.env.S3_BUCKET,
//                 Key: file_name,
//                 Body: req.file.buffer,
//                 ContentType: req.file.mimetype
//             };


//             // Upload the file to S3
//             s3.upload(params, (err, data) => {
//                 if (err) {
//                     res.status(400).json({ 'Error uploading file:': err.message });
//                 } else {
//                     console.log('File uploaded successfully. File location:', data.Key);
//                     const uploadedFileKey = data.Key;

//                     res.status(200).json({ "msg": 'done', uploadedFileKey });

//                 }
//             });


//         }


//     } catch (error) {
//         res.status(400).json({ "msg": error.message });
//     }
// }


// module.exports = {
//     uploadMultipleFiles,
//     uploadSingleFile
// }