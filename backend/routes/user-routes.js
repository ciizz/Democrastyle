const express = require('express');
const router = express.Router();
const UserRepository = require('../dao/user-repository');
const multer = require("multer");
const upload = multer();

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

/* POST upload user profile picture. */
router.post('/:username/upload_profile_picture', upload.single("file"), async function(req, res, next) {
  try {
      await UserRepository.uploadProfilePicture(req.file, req.params.username);
      res.status(200).json({ message: "Image uploaded successfully" });
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

/* PUT update user. */
router.put('/:username/update_user', async function(req, res, next) {
    const username = req.params.username;
    // Possible updates: first name, last name
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const user = await UserRepository.updateUserData(username, email, firstName, lastName);
    res.status(200).json(user);
});

module.exports = router;