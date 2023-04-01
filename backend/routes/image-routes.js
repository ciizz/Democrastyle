const express = require('express');
const router = express.Router();
const { Blob } = require("buffer");
const multer = require("multer");
const upload = multer();
const ImageRepository = require('../dao/image-repository');

/* GET all stylized images. */
router.get('/stylized_images', async function (req, res, next) {
    try {
        const stylizedImages = await ImageRepository.getAllStylizedImages();
        res.status(200).json(stylizedImages);
    } catch (error) {
        next(error);
    }
});

/* GET all premade styles. */
router.get('/premade_styles', async function (req, res, next) {
    try {
        const premadeStyles = await ImageRepository.getPremadeStyles();
        res.status(200).json(premadeStyles);
    } catch (error) {
        next(error);
    }
});

/* POST perform inference. */
// TODO: either rename each file from the frontend (this way they can have same name, won't matter for us),
// or send key-value pairs with request indicating which file is which (content or style)
router.post('/perform_inference', upload.array("images"), async function (req, res, next) {
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
    } else if (!req.body.user) {
        res.status(400).json({ message: "Missing user" });
        return;
    }

    let styleImageSize = 512;
    let sampleMode = "scale";
    if (req.body.styleImageSize) {
        styleImageSize = req.body.styleImageSize;
    }
    if (req.body.sampleMode) {
        sampleMode = req.body.sampleMode;
    }

    try {
        const files = req.files;
        const contentImageFileName = req.body.contentImageName;
        var contentUploadRes = null;
        var styleUploadRes = null;
        console.log("Uploading images...");
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
        console.log("Images uploaded successfully");

        const contentImageKey = contentUploadRes.Key;
        const styleImageKey = styleUploadRes.Key;
        const username = req.body.user;
        // await ImageRepository.saveContentImageToDB(contentImageKey, username);
        // await ImageRepository.saveStyleImageToDB(styleImageKey, username);
        console.log("Performing style transfer...");
        const styleRes = await ImageRepository.performStyleTransfer(contentImageKey, styleImageKey, styleImageSize, sampleMode);
        const stylizedImageKey = styleRes.data.id;
        const stylizedImageURL = styleRes.data.url;
        // save to db
        await ImageRepository.saveStylizedImageToDB(stylizedImageKey, stylizedImageURL, username, contentImageKey, styleImageKey);
        await ImageRepository.trackRequestLocation(req);
        res.status(200).json({
            message: "Style transfer successful",
            imageURL: stylizedImageURL
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;