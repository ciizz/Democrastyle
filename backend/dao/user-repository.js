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
    } else if (readUserData(username) == null) {
        return "Username is taken";
    } else {
        const user = writeUserData(username, firstName, lastName, email, imageUrl);
        return user;
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
exports.writeUserData = async (username, firstName, lastName, email, imageUrl) => {
    const user = new User(username, firstName, lastName, email, imageUrl);
    set(ref(db, 'users/' + username), user);
    return user;
}

/**
 * 
 * @param {string} username 
 * @returns the user
 */
exports.readUserData = async (username) => {
    get(ref(db, 'users/' + username)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return snapshot.val();
        } else {
            console.log("No data available");
            return null;
        }
    }).catch((error) => {
        console.error(error);
    });
}

