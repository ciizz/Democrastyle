const { storage } = require('../config/firebase');
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const InputImage = require('../models/InputImage');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

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
exports.uploadContentImageToS3 = async (contentImage) => {
    // generate unique file key for S3
    const contentFileKey = uuidv4() + '-' + 'content.jpeg';
    // upload input image to s3
    const uploadedInputImage = await s3.upload({
        Bucket: process.env.AWS_S3_CONTENT_BUCKET_NAME,
        Key: contentFileKey,
        Body: contentImage.buffer,
    }).promise()

    return uploadedInputImage;
}


/**
 * @param {string} filename
 * 
 */
exports.uploadStyleImageToS3 = async (styleImage) => {
    // generate unique file key for S3
    const styleFileKey = uuidv4() + '-' + styleImage.originalname + '-style.jpeg';
    // upload style image to s3
    const uploadedStyleImage = await s3.upload({
        Bucket: process.env.AWS_S3_STYLE_BUCKET_NAME,
        Key: styleFileKey,
        Body: styleImage.buffer,
    }).promise()

    return uploadedStyleImage;
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

/**
 */
exports.performStyleTransfer = async (contentImageKey, styleImageKey) => {
    const styleReqBody = {
        "content": {
          "key": contentImageKey,
          "size": 1024
        },
        "style": {
          "key": styleImageKey,
          "size": 512,
          "sampleMode": "scale"
        }
    }

    const styleRes = await axios.post(process.env.STYLE_TRANSFER_API_URL, styleReqBody);
    return styleRes;
}