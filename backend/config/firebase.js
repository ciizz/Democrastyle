// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNKwf2iaK6dToVjvS9nMRv-xLK-qzXfV4",
  authDomain: "democrastyle-a73d2.firebaseapp.com",
  projectId: "democrastyle-a73d2",
  storageBucket: "democrastyle-a73d2.appspot.com",
  messagingSenderId: "32774393359",
  appId: "1:32774393359:web:e2bc3732079662bedd1d7a",
  measurementId: "G-VWPZ054CYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// const analytics = getAnalytics(app);

exports.app = app;
exports.db = database;
// exports.analytics = analytics;