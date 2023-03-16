// run the uploadImagePair function from the image-repository.js file
const ImageRepository = require('../dao/image-repository');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


// get image content.jpeg from inside of this folder
// Generate unique filename
const inputFileName = uuidv4() + '-' + 'content.jpeg';
const inputImage = {
    path: path.join(__dirname, 'content.jpeg'),
    originalFilename: inputFileName
}

// get image style.jpeg from inside of this folder
// Generate unique filename
const styleFileName = uuidv4() + '-' + 'style.jpeg';
const styleImage = {
    path: path.join(__dirname, 'style.jpeg'),
    originalFilename: styleFileName
}

ImageRepository.uploadContentImageToS3(inputImage, styleImage);
ImageRepository.uploadStyleImageToS3(inputImage, styleImage);