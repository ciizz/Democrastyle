var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://democrastyle-a73d2-default-rtdb.firebaseio.com"
});

// Initialize Realtime Database and get a reference to the service
const database = admin.database();

// Create a root reference
const storage = admin.storage().bucket();

// Auth
const auth = admin.auth();

exports.admin = admin;
exports.db = database;
exports.storage = storage;
exports.auth = auth;