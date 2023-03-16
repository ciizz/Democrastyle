const express = require('express');
const router = express.Router();
const { Blob } = require("buffer");
const multer = require("multer")
const upload = multer()
const ImageRepository = require('../dao/image-repository');

/* POST upload image. */
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
router.post('/perform_inference', upload.single("image"), async function(req, res, next) {
    try {
        const file = req.file;
        const result = await ImageRepository.performInference(file);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;