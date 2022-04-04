const express = require("express");
const User = require("../models/user");
const config = require("../config");
const jwt = require("jwt-simple");

exports.login = function (req, res) {
  console.log(req.body);
  console.log("Logged In");
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.log("Error Happened In auth /token Route");
    } else {
      var payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
      };
      var token = jwt.encode(payload, config.jwtSecret);
      res.json({
        token: token,
        //id: user.id,
        isAdmin: user.isAdmin,
      });
    }
  });
};
exports.register = async (req, res) => {
  console.log("called");
  const { username, password, isAdmin, name } = req.body;
  try {
    let p = new Promise(async (resolve, reject) => {
      if (name) {
        const user = await new User({
          username,
          isAdmin,
          name,
        });
        await User.register(user, password);
        resolve(user);
      } else {
        const user = await new User({ username, isAdmin });
        await User.register(user, password);
        resolve(user);
      }
    });
    p.then(async (user) => {
      console.log(user);
      try {
        const payload = {
          id: user._id,
        };
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({ token: token, isAdmin: user.isAdmin, id: user._id });
      } catch (error) {
        return res.status(409).send({ error: error.message });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(442).send(error.message);
  }
};
