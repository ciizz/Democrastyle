class User {
  constructor(username, firstName, lastName, email) {
    if (!email || !username || !firstName || !lastName) {
      throw new Error('Email, username, first name, last name are required');
    }
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

module.exports = User;
