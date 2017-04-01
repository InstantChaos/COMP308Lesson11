// required for firebase
let firebase = require('../config/firebase');
let firebaseAuth = firebase.auth;

// Display the Home Page
module.exports.DisplayHome = (req, res) => {
  res.render('content/index', {
    title: 'Home',
    games: '',
    displayName: firebaseAuth.currentUser ? firebaseAuth.currentUser.displayName : ''
   });
}

// Displays the Contact Page
module.exports.DisplayContact = (req, res) => {
  res.render('content/contact', {
    title: 'Contact',
    games: '',
    displayName: firebaseAuth.currentUser ? firebaseAuth.currentUser.displayName : ''
   });
}
