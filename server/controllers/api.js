let mongoose = require('mongoose');

// define the game model
let game = require('../models/games');

// required for firebase
let firebase = require('../config/firebase');
let firebaseDB = firebase.games;
// let firebaseAdmin = firebase.admin;
let firebaseAuth = firebase.auth;

// Read and display the Game List
module.exports.ReadGameList = (req, res) => {
  // find all games in the games collection

  firebaseDB.orderByKey().once("value", (snapshot)=>{
    res.status(200).json(snapshot.val());
  });
}

// Create a new game and insert it into the db
module.exports.CreateGame = (req, res) => {
  let newGame = {
      "name": req.body.name,
      "cost": req.body.cost,
      "rating": req.body.rating
    };

    let newchild = null;

    firebaseDB.once("value", (snapshot) => {
      // read the number of children of the games list
      newchild = snapshot.numChildren();

      // set the value of the new child
      firebaseDB.child(newchild).set(newGame, (err) =>{
        if(err) {
          console.log(err);
          res.end(err);
        }
        else {
          res.redirect('/api/games');
        }
      });
    });
}

module.exports.GetGameById = (req, res) => {
    try {

      // get the game id from the url
      let id = req.params.id;

      firebaseDB.child(id).once("value", (snapshot)=>{
        res.status(200).json(snapshot.val());
      },
      (err) => {
        if(err) {
          console.log(err);
          res.end(err);
        }
        else {
          res.redirect('/api/games');
        }
      });
    } catch (err) {
      console.log(err);
      res.status(400).redirect('/errors/404');
    }
}

// Update an existing Game in the games collection
module.exports.UpdateGame = (req, res) => {
  // get a reference to the id from the url
    let id = req.params.id;

     let updatedGame = {
      "name": req.body.name,
      "cost": req.body.cost,
      "rating": req.body.rating
    };

    firebaseDB.child(id).update(updatedGame, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      }
      else {
        res.redirect('/api/games');
      }
    });
}

// Deletes a game from the games collection
module.exports.DeleteGame = (req, res) => {
    // get a reference to the id from the url
    let id = req.params.id;

    game.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      }
    });
}
