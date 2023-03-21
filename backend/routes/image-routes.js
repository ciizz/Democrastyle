const express = require('express');
const router = express.Router();
const { Blob } = require("buffer");
const multer = require("multer");
const upload = multer();
const ImageRepository = require('../dao/image-repository');


/* NOT NEEDED - POST upload image. */
router.post('/upload', upload.single("file"), async function(req, res, next) {
    try {
        const file = req.file;
        await ImageRepository.uploadFile(file);
        res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
        next(error);
    }
});

/* POST perform inference. */
// TODO: either rename each file from the frontend (this way they can have same name, won't matter for us),
// or send key-value pairs with request indicating which file is which (content or style)
router.post('/perform_inference', upload.array("images"), async function(req, res, next) {
    // check if all params are present
    if (!req.body.contentImageName) {
        res.status(400).json({ message: "Missing content image name" });
        return;
    } else if (!req.body.styleImageName) {
        res.status(400).json({ message: "Missing style image name" });
        return;
    } else if (!req.files) {
        res.status(400).json({ message: "Missing images" });
        return;
    } else if (req.files.length != 2) {
        res.status(400).json({ message: "Incorrect number of images" });
        return;
    }
    console.log("Performing inference...");
    try {
        const files = req.files;
        console.log(files[0]);
        const contentImageFileName = req.body.contentImageName;
        var contentUploadRes = null;
        var styleUploadRes = null;
        if (files[0].originalname == contentImageFileName) {
            contentUploadRes = await ImageRepository.uploadContentImageToS3(files[0]);
            styleUploadRes = await ImageRepository.uploadStyleImageToS3(files[1]);
        } else {
            contentUploadRes = await ImageRepository.uploadContentImageToS3(files[1]);
            styleUploadRes = await ImageRepository.uploadStyleImageToS3(files[0]);
        }

        if (!contentUploadRes || !styleUploadRes) {
            res.status(500).json({ message: "Image upload failed" });
            return;
        }

        const contentImageKey = contentUploadRes.Key;
        const styleImageKey = styleUploadRes.Key;
        const username = req.body.user;
        // await ImageRepository.saveContentImageToDB(contentImageKey, username);
        // await ImageRepository.saveStyleImageToDB(styleImageKey, username);
        const styleRes = await ImageRepository.performStyleTransfer(contentImageKey, styleImageKey);
        const stylizedImageKey = styleRes.data.id;
        const stylizedImageURL = styleRes.data.url;
        // save to db
        await ImageRepository.saveStylizedImageToDB(stylizedImageKey, stylizedImageURL, username, contentImageKey, styleImageKey);
        res.status(200).json({
            message: "Style transfer successful",
            imageURL: stylizedImageURL
        });
    } catch (error) {
        next(error);
        console.log(error);
    }
});

module.exports = router;