const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");


// ADMIN ------------------------------------------------------------------------
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://democrastyle-a73d2-default-rtdb.firebaseio.com"
});

// Initialize Realtime Database and get a reference to the service
const database = admin.database();

// Auth
const auth = admin.auth();


// NON-ADMIN ------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBNKwf2iaK6dToVjvS9nMRv-xLK-qzXfV4",
  authDomain: "democrastyle-a73d2.firebaseapp.com",
  projectId: "democrastyle-a73d2",
  storageBucket: "democrastyle-a73d2.appspot.com",
  messagingSenderId: "32774393359",
  appId: "1:32774393359:web:e2bc3732079662bedd1d7a",
  measurementId: "G-VWPZ054CYF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a root reference
const storage = getStorage();


// EXPORTS ------------------------------------------------------------------------
exports.admin = admin;
exports.db = database;
exports.storage = storage;
exports.auth = auth;