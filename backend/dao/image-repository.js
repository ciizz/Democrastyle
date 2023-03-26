const { db, storage } = require('../config/firebase');
const { ref: db_ref, set, get } = require("firebase/database");
const { ref: storage_ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const InputImage = require('../models/InputImage');
const StylizedImage = require('../models/StylizedImage');
const { Upload } = require("@aws-sdk/lib-storage");
const { S3 } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const s3 = new S3({
    region: "us-east-2"
    // credentials are fetched from env variables
});

/** 
 * @param {string} filename
 **/
exports.uploadProfilePicture= async (file, user) => {
    const fileType = file.mimetype.split('/')[1];
    const imageKey = user + '.' + fileType;
    const imageRef = storage_ref(storage, 'profilePictures/' + user);
    try {
        await uploadBytes(imageRef, file.buffer);
        console.log('Uploaded file to firebase');
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @params {string} username
 * @returns
 */
exports.getProfilePicture = async (username) => {
    console.log(username);
    const imageRef = storage_ref(storage, 'profilePictures/' + username);
    try {
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        console.log(error);
    }
}

/**
 *  
 * @returns 
 */
exports.getAllStylizedImages = async () => {
    const stylizedImagesRef = db_ref(db, 'stylizedImages');
    try {
        const snapshot = await get(stylizedImagesRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @param {string} contentImage
 * 
 */
exports.uploadContentImageToS3 = async (contentImage) => {
    // generate unique file key for S3
    const contentFileKey = uuidv4() + '-' + 'content.jpeg';
    // upload input image to s3
    const uploadedInputImage = await new Upload({
        client: s3,
        params: {
            Bucket: process.env.AWS_S3_CONTENT_BUCKET_NAME,
            Key: contentFileKey,
            Body: contentImage.buffer,
        }
    }).done();

    return uploadedInputImage;
}


/**
 * @param {string} styleImage
 * 
 */
exports.uploadStyleImageToS3 = async (styleImage) => {
    // generate unique file key for S3
    const styleFileKey = uuidv4() + '-' + 'style.jpeg';
    // upload style image to s3
    const uploadedStyleImage = await new Upload({
        client: s3,
        params: {
            Bucket: process.env.AWS_S3_STYLE_BUCKET_NAME,
            Key: styleFileKey,
            Body: styleImage.buffer,
        }
    }).done();

    return uploadedStyleImage;
}

/** 
 * @param {string} image_S3_key
 * @param {string} username
 **/
exports.saveContentImageToDB = async (image_S3_key, username) => {
    const contentImage = new InputImage(image_S3_key, username);
    try {
        const snapshot = await set(db_ref(db, 'contentImages/' + image_S3_key), contentImage);
        console.log(snapshot);
        return contentImage;
    } catch (error) {
        console.log(error);
    }
}

/** 
 * @param {string} image_S3_key
 * @param {string} username
 **/
exports.saveStyleImageToDB = async (image_S3_key, username) => {
    const styleImage = new InputImage(image_S3_key, username);
    try {
        const snapshot = await set(db_ref(db, 'styleImages/' + image_S3_key), styleImage);
        console.log(snapshot);
        return styleImage;
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} url
 * @param {*} username
 * @param {*} contentImageKey 
 * @param {*} styleImageKey 
 * @returns 
 */
exports.saveStylizedImageToDB = async (S3_key, url, username, contentImageKey, styleImageKey) => {
    const stylizedImage = new StylizedImage(S3_key, url, username, contentImageKey, styleImageKey);
    try {
        const snapshot = await set(db_ref(db, 'stylizedImages/' + S3_key), stylizedImage);
        console.log(snapshot);
        return stylizedImage;
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