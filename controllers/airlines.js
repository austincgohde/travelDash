const knex = require('knex');
const kpop = require("knex-populate");

module.exports = {

  login: (req, res) => {
    res.render("airLogin");
  },

  check: (req, res) => {
    knex("airlines")
      .where("name", req.body.username)
      .then((result) => {
        let airline = result[0];
        if(req.body.password === airline.password) {
          req.session.admin = {id: airline.id, name: airline.name}
          res.redirect("/airline/" + airline.id)
        } else {
          req.session.message = "You entered an invalid username or password"
          res.redirect("/airline/login")
        }
      })
      .catch((err) => {
        console.error(err);
        req.session.message = "We have encountered an error. Please try again"
        res.redirect("/airline/login")
      })
  },

  dashboard: (req, res) => {
    knex("")
  }
}
