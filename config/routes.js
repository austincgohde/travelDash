const trips = require('../controllers/trips.js');
const airlines = require('../controllers/airlines.js');

module.exports = function(app){

  app.get('/', trips.index);

  app.get("/login", trips.login);

  app.post("/create", trips.createUser);

  app.post("/login", trips.check);

  app.get("/trips", trips.dashboard);

  app.post("/trips/create", trips.createTrip);




  app.get("/airline/login", airlines.login);

  app.post("/airline/create", airlines.createAirline);

  app.post("/airline/login", airlines.check);

  app.post("/flight/create", airlines.createFlight);

  app.get("/airline", airlines.dashboard);

}
