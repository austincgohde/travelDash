const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: (req, res) => {
    res.render("index");
  },

  createUser: (req, res) => {
    knex("users")
      .insert({
        name: req.body.usename,
        password: req.body.password
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.error(err);
        req.session.message = "Sorry, there was an error. Try again please"
        res.redirect("/login")
      })
  },

  login: (req, res) => {
    res.render("userLogin");
  },

  check: (req, res) => {
    knex("users")
      .where("username", req.body.username)
      .then((result) => {
        let user = result[0];
        if(user.password === req.body.password) {
          req.session.user = { id: user.id, name: user.name };
          res.redirect("/trips");
        }
      })
      .catch((err) => {
        console.error(err);
        res.redirect("/login");
      })
  },

  dashboard: (req, res) => {
    // LOGIC FOR JOINS BETWEEN USERS AND TRIPS ALSO FLIGHTS AND AIRLINES
    // OR A COMPLETE JOIN WITH ALL 4
    res.render("trips", bunch of shit and some more shit with it all)
  },

  createTrip
}
