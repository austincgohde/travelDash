const knex = require('../db/knex.js');

module.exports = {

  login: (req, res) => {
    res.render("airLogin");
  },

  check: (req, res) => {
    knex("airlines")
      .where("username", req.body.username)
      .then((result) => {
        let airline = result[0];
        if(req.body.password === airline.password) {
          req.session.admin = {id: airline.id, airline: airline.airline};
          req.session.save(() => {
            res.redirect("/airline")
          })
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
    console.log("HELLO");
    knex.raw(`SELECT flights.id, flights.departure, flights.arrival, airlines.airline FROM flights JOIN airlines ON airlines.id = flights.airline_id WHERE airlines.id = ${req.session.admin.id}`)
      .then((result) => {
        console.log(result.rows);
        res.render("airline", { flights: result.rows })
      })
      .catch((err) => {
        console.error(err);
      })
  },

  createFlight: (req, res) => {
    knex("flights")
      .insert({
        departure: req.body.departure,
        arrival: req.body.arrival,
        airline_id: req.session.admin.id
      })
      .then(() => {
        res.redirect("/airline")
      })
      .catch((err) => {
        console.error(err);
        res.redirect("/airline")
      })
  },

  createAirline: (req, res) => {
    knex("airlines")
      .insert({
        airline: req.body.airline,
        username: req.body.username,
        password: req.body.password,
        description: "We are an airline DUH!!!"
      })
      .then(() => {
        res.redirect("/airline/login")
      })
      .catch((err) => {
        console.error(err);
      })
  }
}
