const express = require('express');
const router = express.Router();
const UserRepository = require('../dao/user-repository');

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
    const user = await UserRepository.readUserData(username);
    res.status(200).json(user);
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
    const imageUrl = req.body.imageUrl;
    const user = await UserRepository.createNewUser(username, firstName, lastName, email, imageUrl);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

/* PUT update user. */
router.put('/:username/update_user', async function(req, res, next) {
    const username = req.params.username;
    const new_username = req.body.new_username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const imageUrl = req.body.imageUrl;
    const user = await UserRepository.updateUserData(username, new_username, email, firstName, lastName, imageUrl);
    res.status(200).json(user);
});

module.exports = router;