const express = require('express');
const router = express.Router();
const UserRepository = require('../dao/user-repository');
// const multer = require("multer");
// const upload = multer();
const Busboy = require('busboy');
const os = require('os');
const path = require('path');
const fs = require('fs');

/* GET user by username. */
router.get('/:username', async function(req, res, next) {
  try {
    const username = req.params.username;
    const user = await UserRepository.readUserData(username);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

/* GET stylized images by username. */
router.get('/:username/stylized_images', async function(req, res, next) {
  try {
    const username = req.params.username;
    const stylizedImages = await UserRepository.getStylizedImagesByUser(username);
    res.status(200).json(stylizedImages);
  } catch (error) {
    next(error);
  }
});

// /* POST upload user profile picture. */
// router.post('/:username/upload_profile_picture', upload.single("file"), async function(req, res, next) {
//   try {
//       const profilePicture = await UserRepository.uploadProfilePicture(req.file, req.params.username);
//       if (profilePicture == null) {
//           res.status(400).json({ message: "Image upload failed" });
//       } else {
//           res.status(200).json({ message: "Image uploaded successfully", profilePicture: profilePicture });
//       }
//   } catch (error) {
//       next(error);
//   }
// });


/* POST upload user profile picture. */
router.post('/:username/upload_profile_picture', async function(req, res, next) {
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
  
      const profilePicture = fs.readFileSync(uploads['file']);
      const uploadedProfilePicture = await UserRepository.uploadProfilePicture(profilePicture, req.params.username);
  
      for (const file in uploads) {
        fs.unlinkSync(uploads[file]);
      }
      res.status(200).json({ message: "Image uploaded successfully", profilePicture: uploadedProfilePicture });
    });
  
    busboy.end(req.rawBody);
  } catch (error) {
    next(error);
  }
});


/* GET user profile picture. */
router.get('/:username/get_profile_picture', async function(req, res, next) {
  try {
      const profilePicture = await UserRepository.getProfilePicture(req.params.username);
      res.status(200).json({ profilePicture: profilePicture });
  } catch (error) {
      next(error);
  }
});

/* POST create new user. */
router.post('/new_user', async function(req, res, next) {
  try {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const user = await UserRepository.createNewUser(username, firstName, lastName, email);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

/* PUT update user email. */
router.put('/:uid/update_user_email', async function(req, res, next) {
  try {
    const uid = req.params.uid;
    const email = req.body.email;
    const user = await UserRepository.updateUserEmail(uid, email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

/* PUT update user display name. */
router.put('/:uid/update_user_display_name', async function(req, res, next) {
  try {
    const uid = req.params.uid;
    const displayName = req.body.displayName;
    const user = await UserRepository.updateUserDisplayName(uid, displayName);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

/* GET check if user email is taken. */
router.get('/is_email_taken/:email', async function(req, res, next) {
  try {
    const email = req.params.email;
    const bool = await UserRepository.isEmailTaken(email);
    res.status(200).json(bool);
  } catch (error) {
    next(error);
  }
});

/* GET check is user display name is taken. */
router.get('/is_displayname_taken/:displayName', async function(req, res, next) {
  try {
    const displayName = req.params.displayName;
    const bool = await UserRepository.isDisplayNameTaken(displayName);
    res.status(200).json(bool);
  } catch (error) {
    next(error);
  }
});

module.exports = router;