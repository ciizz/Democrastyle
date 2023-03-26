const { db, storage } = require('../config/firebase');
const { ref, set, get } = require("firebase/database");
const User = require('../models/user');
const { ref: storage_ref, uploadBytes, getDownloadURL } = require("firebase/storage");



/** 
 * @param {string} filename
 **/
exports.uploadProfilePicture= async (file, user) => {
    const fileType = file.mimetype.split('/')[1];
    const imageKey = user + '.' + fileType;
    const imageRef = storage_ref(storage, 'profilePictures/' + user);
    try {
        await uploadBytes(imageRef, file.buffer);
        console.log('Uploaded file to firebase');
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @params {string} username
 * @returns
 */
exports.getProfilePicture = async (username) => {
    console.log(username);
    const imageRef = storage_ref(storage, 'profilePictures/' + username);
    try {
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {string} username 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @returns newly created user
 */
exports.createNewUser = async (username, firstName, lastName, email) => {
    // check if non existent
    // if non existent, create new user
    // if existent, return error
    if (username == null || firstName == null || lastName == null || email == null) {
        return "Missing parameters";
    } else if (await getUserByUsername(username) != null) {
        return "Username is taken";
    } else if (await isEmailTaken(email) == true) {
        return "Email is taken";
    } else {
        return await writeUserData(username, firstName, lastName, email)
    }
}

/**
 * 
 * @param {string} username 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @returns the updated user 
 */
exports.updateUserData = async (username, email, firstName, lastName) => {
    // check if user exists
    // if user exists, update user
    // if user does not exist, return error
    if (username == null || firstName == null || lastName == null || email == null) {
        return "Missing parameters";
    } else if (await getUserByUsername(username) == null) {
        return "User does not exist";
    } else {
        return await writeUserData(username, firstName, lastName, email)
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
 * @returns the newly created or updated user (depending on if user exists)
 * @throws error if error occurs
 * @description creates a new user/ updates existing user and add email to user_emails for reference
 */
writeUserData = async (username, firstName, lastName, email,) => {
    const user = new User(username, firstName, lastName, email);
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