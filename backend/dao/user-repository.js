const { db } = require('../config/firebase');
const { ref, set, get } = require("firebase/database");
const User = require('../models/user');

/**
 * 
 * @param {string} username 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} imageUrl 
 * @returns newly created user
 */
exports.createNewUser = async (username, firstName, lastName, email, imageUrl) => {
    // check if non existent
    // if non existent, create new user
    // if existent, return error
    if (username == null || firstName == null || lastName == null || email == null || imageUrl == null) {
        return "Missing parameters";
    } else if (await getUserByUsername(username) != null) {
        return "Username is taken";
    } else if (await isEmailTaken(email) == true) {
        return "Email is taken";
    } else {
        return await writeUserData(username, username, firstName, lastName, email, imageUrl)
    }
}

/**
 * 
 * @param {string} username 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} imageUrl 
 * @returns the updated user 
 */
exports.updateUserData = async (username, new_username, email, firstName, lastName, imageUrl) => {
    // check if user exists
    // if user exists, update user
    // if user does not exist, return error
    // if (username == null || new_username == null || firstName == null || lastName == null || email == null || imageUrl == null) {
    //     return "Missing parameters";
    if (username == null) {
        return "Missing username";
    } else if (new_username == null) {
        return "Missing new username";
    } else if (firstName == null) {
        return "Missing first name";
    } else if (lastName == null) {
        return "Missing last name";
    } else if (email == null) {
        return "Missing email";
    } else if (imageUrl == null) {
        return "Missing image url";
    } else if (await getUserByUsername(username) == null) {
        return "User does not exist";
    } else if (await getUserByUsername(new_username) != null) {
        return "Username is taken";
    } else {
        return await writeUserData(username, new_username, firstName, lastName, email, imageUrl)
    }
}

/**
 * 
 * @param {string} username 
 * @returns the user
 */
exports.readUserData = async (username) => {
    const user = await getUserByUsername(username);
    return user;
}

/**
 * 
 * @param {*} user 
 */
exports.getStylizedImagesByUser = async (user) => {
    const snapshot = await get(ref(db, 'stylizedImages'));
    const stylizedImages = snapshot.val();
    const stylizedImagesByUser = [];
    for (const key in stylizedImages) {
        if (stylizedImages[key].user == user) {
            stylizedImagesByUser.push(stylizedImages[key]);
        }
    }
    return stylizedImagesByUser;
}

// HELPER FUNCTIONS ------------------------------------------------------------------------------------------

/**
 * 
 * @param {string} username
 * @returns user if user exists, null if user does not exist
 * @throws error if error occurs
 * @description checks if user exists
 */
getUserByUsername = async (username) => {
    const snapshot = await get(ref(db, 'users/' + username));
    if (snapshot.exists()) {
        const user = snapshot.val();
        return user;
    } else {
        return null;
    }
}

/**
 * 
 * @param {string} username
 * @param {string} new_username
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} imageUrl
 * @returns the newly created or updated user (depending on if user exists)
 * @throws error if error occurs
 * @description creates a new user/ updates existing user and add email to user_emails for reference
 */
writeUserData = async (username, new_username, firstName, lastName, email, imageUrl) => {
    const user = new User(new_username, firstName, lastName, email, imageUrl);
    set(ref(db, 'users/' + username), user);
    return user;
}


/** VERY INEFFICIENT BRUTE FORCE METHOD
 * 
 * @param {string} email
 * @returns true if email is taken, false if email is not taken
 * @throws error if error occurs
 * @description checks if email is taken among all users
 */
isEmailTaken = async (email) => {
    // iterate through all users
    // if email is found, return true
    // if email is not found, return false
    const snapshot = await get(ref(db, 'users/'));
    if (snapshot.exists()) {
        const users = snapshot.val();
        for (const user in users) {
            if (users[user].email == email) {
                return true;
            }
        }
        return false;
    }
}