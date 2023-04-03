const { auth, db, storage } = require('../config/firebase');
const { ref, set, get } = require("firebase/database");
const { ref: storage_ref, uploadBytes, getDownloadURL } = require("firebase/storage");
// const fs = require('fs');

/** 
 * @param {string} filename
 **/
exports.uploadProfilePicture= async (file, user) => {
    // const file = fs.readFileSync(filePath);
    const imageRef = storage_ref(storage, 'profilePictures/' + user);
    try {
        await uploadBytes(imageRef, file.buffer);
        console.log('Uploaded file to firebase');
        const url = await getDownloadURL(imageRef);
        return url;
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
 * @param {*} user 
 * @returns 
 */
exports.updateUserEmail = async (uid, newEmail) => {
    try {
        // check if display name is taken
        const bool = await this.isEmailTaken(newEmail);
        if (bool == true) {
            return "Email is taken";
        }

        const user = await auth.getUser(uid);
        await auth.updateUser(user.uid, {
            email: newEmail
        });
        return "Email updated";
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} user 
 * @returns 
 */
exports.updateUserDisplayName = async (uid, newDisplayName) => {
    try {
        // check if display name is taken
        const bool = await isDisplayNameTaken(newDisplayName);
        if (bool == true) {
            return "Display name is taken";
        }

        const user = await auth.getUser(uid);
        await auth.updateUser(user.uid, {
            displayName: newDisplayName
        });
        return "Display name updated";
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} user 
 * @returns 
 */
exports.isEmailTaken = async (newEmail) => {
    try {
        // check if email is taken
        const res = await auth.getUserByEmail(newEmail);
        if (res != null) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

/**
 * 
 * @param {*} user 
 * @returns 
 */
exports.isDisplayNameTaken = async (displayName) => {
    try {
        // Retrieve all users
        const listUsersResult = await auth.listUsers();
        // Check if any user has the same display name
        const displayNameTaken = listUsersResult.users.some((user) => user.displayName === displayName);
        
        return displayNameTaken;
    } catch (error) {
        console.error('Error while checking if display name is taken:', error);
        throw error;
    }
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
 * @param {string} displayName
 * @returns true if username is taken, false otherwise
 * @throws error if error occurs
 * @description checks if display name is taken
 */
isDisplayNameTaken = async (displayName) => {
    try {
        // Retrieve all users
        const listUsersResult = await auth.listUsers();
        // Check if any user has the same display name
        const displayNameTaken = listUsersResult.users.some((user) => user.displayName === displayName);
        
        return displayNameTaken;
    } catch (error) {
        console.error('Error while checking if display name is taken:', error);
        throw error;
    }
}


/**
 * 
 * @param {string} email
 * @returns true if email is taken, false otherwise
 * @throws error if error occurs
 * @description checks if email is taken
 */
isEmailTaken = async (email) => {
    try {
        // check if email is taken
        const res = await auth.getUserByEmail(newEmail);
        if (res != null) {
            return "Email is taken";
        }
    } catch {
        // email is not taken
        const user = await auth.getUser(uid);
        await auth.updateUser(user.uid, {
            email: newEmail
        });
        return "Email updated";
    }
}