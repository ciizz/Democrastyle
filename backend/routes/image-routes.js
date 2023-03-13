const express = require('express');
const router = express.Router();
const { Blob } = require("buffer");
const multer = require("multer")
const upload = multer()
const ImageRepository = require('../dao/image-repository');

/* POST upload image. */
router.post('/upload_image', upload.single("image"), async function(req, res, next) {
    try {
        const file = req.file;
        await ImageRepository.uploadImage(file);
        res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;