const { storage } = require('../config/firebase');
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");


// Create a storage reference from our storage service
const storageRef = ref(storage);

/** 
 * @param {string} filename
 **/
exports.uploadFile= async (file) => {
    const imageRef = ref(storage, file.originalname);
    try {
        await uploadBytes(imageRef, file.buffer);
        console.log('Uploaded file to firebase');
    } catch (error) {
        console.log(error);
    }
}


/**
 * @param {string} filename
 * 
 */
exports.performInference = async (inputImage, styleImage) => {
}