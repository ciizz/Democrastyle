const { storage } = require('../config/firebase');
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");


// Create a storage reference from our storage service
const storageRef = ref(storage);

/** 
 * 
 * @param {string} 
 */
exports.uploadImage = async (file) => {
    // 'file' comes from the Blob or File API
    const imageRef = ref(storage, file.originalname);
    try {
        await uploadBytes(imageRef, file.buffer);
        console.log('Uploaded file to firebase');
    } catch (error) {
        console.log(error);
    }
}
