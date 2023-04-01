const { admin, db, storage} = require('../config/firebase');
const { ref: db_ref, set, get } = require("firebase/database");
const { ref: storage_ref, uploadBytes, getDownloadURL, listAll } = require("firebase/storage");
const { Upload } = require("@aws-sdk/lib-storage");
const { S3 } = require("@aws-sdk/client-s3");
const InputImage = require('../models/InputImage');
const StylizedImage = require('../models/StylizedImage');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');


const s3 = new S3({
    region: "us-east-2"
    // credentials are fetched from env variables
});

/**
 *  
 * @returns 
 */
exports.getAllStylizedImages = async () => {
    const snapshot = await get(db_ref(db, 'stylizedImages'));
    const stylizedImages = snapshot.val();
    const result = [];
    for (const key in stylizedImages) {
        result.push(stylizedImages[key]);
    }
    return result;
}

/**
 * 
 * @param {}
 * @returns
 * @description gets all premade style images
 */
exports.getPremadeStyles = async () => {
    // Create a reference under which you want to list
    const imagesRef = storage_ref(storage, 'premadeStyles');

    let premadeStyles = [];

    try {
        const res = await listAll(imagesRef);
        for (const item of res.items) {
            const url = await getDownloadURL(item);
            const filename = item.name;
            premadeStyles.push({url, filename});
        }
    } catch (error) {
        console.log(error);
    }
    return premadeStyles;
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
        await set(db_ref(db, 'stylizedImages/' + S3_key), stylizedImage);
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


/**
 * 
 */
exports.trackRequestLocation = async (req) => {
    console.log("Tracking location...");
    const clientIp = requestIp.getClientIp(req);
    const geo = geoip.lookup(clientIp);
    if (geo && geo.country) {
        console.log(`Request from ${geo.country}`);
        const countRef = db_ref(db, 'requestsPerLocation/' + geo.country);
        // check if the count value exists
        const snapshot = await get(countRef);
        if (snapshot.exists()) {
            const count = snapshot.val();
            await set(countRef, count+1);
            console.log(`Count value for ${geo.country} is ${count+1}`);
        } else {
            console.log(`No count value found for ${geo.country}, initializing to 1`);
            // set the initial count value to 0 if it doesn't exist
            await set(countRef, 1);
        }
    } else {
        console.log(`Could not determine location for IP address: ${clientIp}`);
        // optionally, skip tracking the location information for this request
    }
}

/**
 * 
 */
exports.getRequestCounts = async () => {
    const snapshot = await get(db_ref(db, 'requestsPerLocation'));
    const count = snapshot.val();
    console.log(count);
    return count;
}
