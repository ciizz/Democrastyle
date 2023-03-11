class User {
  constructor(username, firstName, lastName, email, profilePicture) {
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePicture = profilePicture;
  }
}

module.exports = User;
