const express = require('express');
const router = express.Router();
const { Blob } = require("buffer");
const multer = require("multer");
const upload = multer();
const ImageRepository = require('../dao/image-repository');
const Busboy = require('busboy');
const os = require('os');
const path = require('path');
const fs = require('fs');

/* GET all stylized images. */
router.get('/stylized_images', async function (req, res, next) {
    try {
        const stylizedImages = await ImageRepository.getAllStylizedImages();
        res.status(200).json(stylizedImages);
    } catch (error) {
        next(error);
    }
});

/* GET request counts. */
router.get('/request_counts', async function(req, res, next) {
    try {
        const requestCounts = await ImageRepository.getRequestCounts();
        res.status(200).json(requestCounts);
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
router.post('/perform_inference', async function (req, res, next) {
    try {
        const busboy = Busboy({headers: req.headers});
        const tmpdir = os.tmpdir();

        // This object will accumulate all the fields, keyed by their name
        const fields = {};

        // This object will accumulate all the uploaded files, keyed by their name.
        const uploads = {};

        // This code will process each non-file field in the form.
        busboy.on('field', (fieldname, val) => {
            /**
             *  TODO(developer): Process submitted field values here
             */
            console.log(`Processed field ${fieldname}: ${val}.`);
            fields[fieldname] = val;
        });

        const fileWrites = [];

        // This code will process each file uploaded.
        busboy.on('file', (fieldname, file, {filename}) => {
            // Note: os.tmpdir() points to an in-memory file system on GCF
            // Thus, any files in it must fit in the instance's memory.
            console.log(`Processed file ${filename}`);
            const filepath = path.join(tmpdir, filename);
            uploads[fieldname] = filepath;

            const writeStream = fs.createWriteStream(filepath);
            file.pipe(writeStream);

            // File was processed by Busboy; wait for it to be written.
            // Note: GCF may not persist saved files across invocations.
            // Persistent files must be kept in other locations
            // (such as Cloud Storage buckets).
            const promise = new Promise((resolve, reject) => {
            file.on('end', () => {
                writeStream.end();
            });
            writeStream.on('close', resolve);
            writeStream.on('error', reject);
            });
            fileWrites.push(promise);
        });


        // Triggered once all uploaded files are processed by Busboy.
        // We still need to wait for the disk writes (saves) to complete.
        busboy.on('finish', async () => {
            await Promise.all(fileWrites);

            const contentImage = fs.readFileSync(uploads['contentImage']);
            const styleImage = fs.readFileSync(uploads['styleImage']);
            const username = fields.user;

            if (!contentImage) {
                res.status(400).json({ message: "Missing content image" });
                return;
            } else if (!styleImage) {
                res.status(400).json({ message: "Missing style image" });
                return;
            } else if (!username) {
                res.status(400).json({ message: "Missing user" });
                return;
            }

            // default values
            let styleImageSize = 512;
            let sampleMode = "scale";
            if (fields.styleImageSize) {
                styleImageSize = fields.styleImageSize;
            }
            if (fields.sampleMode) {
                sampleMode = fields.sampleMode;
            }

            const contentUploadRes = await ImageRepository.uploadContentImageToS3(contentImage);
            const styleUploadRes = await ImageRepository.uploadStyleImageToS3(styleImage);

            const contentImageKey = contentUploadRes.Key;
            const styleImageKey = styleUploadRes.Key;

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
        });

        busboy.end(req.rawBody);
    } catch (error) {
        next(error);
    }
});

module.exports = router;