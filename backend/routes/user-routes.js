const express = require('express');
const router = express.Router();
const UserRepository = require('../dao/user-repository');
// const multer = require("multer");
// const upload = multer();
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');


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
//       res.status(200).json({ message: "Image uploaded successfully", profilePicture: profilePicture });
//   } catch (error) {
//       next(error);
//   }
// });

/* POST upload user profile picture. */
router.post('/:username/upload_profile_picture', async function(req, res, next) {
  try {

    const bb = Busboy({ headers: req.headers });
    let fileData = null;
    let fileBlob = null;
    bb.on('file', function (fieldname, file, filename, encoding, mimetype) {
      const filepath = path.join(os.tmpdir(), filename.filename);
      fileData = { filePath: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });
    bb.on('finish', async () => {
      const profilePicture = await UserRepository.uploadProfilePicture(fileData.filePath, req.params.username);
      if (profilePicture == null) {
        res.status(400).json({ message: "Image upload failed" });
      } else {
        res.status(200).json({ message: "Image uploaded successfully", profilePicture: profilePicture });
      }
      fs.unlinkSync(fileData.file);
    });
    req.pipe(bb);
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