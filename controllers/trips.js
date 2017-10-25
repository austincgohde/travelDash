const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: (req, res) => {
    res.render("index");
  },

  createUser: (req, res) => {
    knex("users")
      .insert({
        name: req.body.username,
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
      .where("name", req.body.username)
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
    console.log(req.session.user.id);
    knex.raw(`SELECT trips.id, trips.title, trips.destination, trips.description, flights.id, flights.departure, flights.arrival, airlines.name FROM trips JOIN users ON users.id = trips.user_id JOIN flights ON flights.id = trips.flight_id JOIN airlines ON airlines.id = flights.airline_id WHERE users.id = ${req.session.user.id} ;`)
      .then((result) => {
          let trips = result;
          knex.raw(`SELECT flights.id, flights.departure, flights.arrival, airlines.name FROM flights JOIN airlines ON airlines.id = flights.airline_id;`)
            .then((result) => {
              res.render("trips", { trips: trips, flights: result})
            })
      })
      .catch(err => console.error(err))

  },

  createTrip: (req, res) => {
    knex("trips")
      .insert({
        user_id: req.session.user.id,
        title: req.body.title,
        destination: req.body.destination,
        description: req.body.description,
        flight_id: req.body.flights
      }, "*")
      .then(() => {
        res.redirect("/trips")
      })
  }
}
