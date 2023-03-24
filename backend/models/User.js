class User {
  constructor(username, firstName, lastName, email, profilePicture) {
    if (!email || !username || !firstName || !lastName || !profilePicture) {
      throw new Error('Email, username, first name, last name and profile picture are required');
    }
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePicture = profilePicture;
  }
}

module.exports = User;
