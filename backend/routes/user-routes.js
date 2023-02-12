const express = require('express');
const router = express.Router();
const UserRepository = require('../dao/user-repository');

/* GET user by username. */
router.get('/:username', async function(req, res, next) {
  const username = req.params.username;
  const user = await UserRepository.readUserData(username);
  res.send(user);
});

/* POST create new user. */
router.post('/', async function(req, res, next) {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const imageUrl = req.body.imageUrl;
    const user = await UserRepository.createNewUser(username, firstName, lastName, email, imageUrl);
    res.send(user);
});

/* PUT update user. */
router.put('/:username', async function(req, res, next) {
    const username = req.params.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const imageUrl = req.body.imageUrl;
    const user = await UserRepository.writeUserData(username, firstName, lastName, email, imageUrl);
    res.send(user);
});

module.exports = router;