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
          req.session.admin = {id: airline.id, name: airline.airline}
          res.redirect("/airline")
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
    knex.raw(`SELECT flights.id, flights.departure, flights.arrival FROM flights
        JOIN airlines
          ON airlines.id = flights.airline_id
          WHERE airlines.id = ${req.session.admin.id}`)
      .then((result) => {
        res.render("airline", { flights: result})
      })
      .catch((err) => {
        console.error(err);
      })
  },

  createFlight: (req, res) => {
    knex("flights")
      .insert({

      })
  },

  createAirline: (req, res) => {
    knex("airlines")
      .insert({
        name: req.
      })
  }
}
