const { storage } = require('../config/firebase');
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const InputImage = require('../models/InputImage');
const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3({
    // accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    accessKeyId: 'AKIAREE2EBEFSWEKZCCO',
    // secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    secretAccessKey: '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'
});


// // Create a storage reference from our storage service
// const storageRef = ref(storage);

// /** 
//  * @param {string} filename
//  **/
// exports.uploadFile= async (file) => {
//     const imageRef = ref(storage, file.originalname);
//     try {
//         await uploadBytes(imageRef, file.buffer);
//         console.log('Uploaded file to firebase');
//     } catch (error) {
//         console.log(error);
//     }
// }


/**
 * @param {string} filename
 * 
 */
exports.uploadContentImageToS3 = async (inputImage, styleImage) => {
    // upload input image to s3
    const inputImagePath = inputImage.path
    const inputImageBlob = fs.readFileSync(inputImagePath)
    const uploadedInputImage = await s3.upload({
        // Bucket: process.env.AWS_S3_CONTENT_BUCKET_NAME,
        Bucket: 'democrastyle-input-images/content',
        Key: inputImage.originalFilename,
        Body: inputImageBlob,
    }).promise()

    console.log(uploadedInputImage)
}


/**
 * @param {string} filename
 * 
 */
exports.uploadStyleImageToS3 = async (inputImage, styleImage) => {
    // upload style image to s3
    const styleImagePath = styleImage.path
    const styleImageBlob = fs.readFileSync(styleImagePath)
    const uploadedStyleImage = await s3.upload({
        // Bucket: process.env.AWS_S3_STYLE_BUCKET_NAME,
        Bucket: 'democrastyle-input-images/style',
        Key: styleImage.originalFilename,
        Body: styleImageBlob,
    }).promise()

    console.log(uploadedStyleImage)
}

/** 
 * @param {string} filename
 **/
exports.saveContentImageToDB = async (image_S3_key, username) => {
    const contentImage = new InputImage(image_S3_key, username);
    try {
        const snapshot = await set(ref(db, 'contentImages/' + image_S3_keyame), contentImage);
        console.log(snapshot);
        return contentImage;
    } catch (error) {
        console.log(error);
    }
}

/** 
 * @param {string} filename
 **/
exports.saveStyleImageToDB = async (image_S3_key, username) => {
    const styleImage = new InputImage(image_S3_key, username);
    try {
        const snapshot = await set(ref(db, 'styleImages/' + image_S3_key), styleImage);
        console.log(snapshot);
        return styleImage;
    } catch (error) {
        console.log(error);
    }
}