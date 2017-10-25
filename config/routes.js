const trips = require('../controllers/trips.js');
const airlines = require('../controllers/airlines.js');

module.exports = function(app){

  app.get('/', trips.index);

  app.get("/login", trips.login);

  app.post("/create", trips.createUser);

  app.post("/login", trips.check);

  app.get("/airline/login", airlines.login);

  app.post("/airline/login", airlines.check);

  app.post("/airline/create", airlines.createAirline)

  // app.use(userAuth);

  app.get("/trips", trips.dashboard);

  app.post("/trips/create", trips.createTrip);

  // app.use(adminAuth);

  app.get("/airline", airlines.dashboard);

  app.post("/flight/create", airlines.createFlight)
}

let userAuth = (req, res, next) => {
  if(req.session.user || req.session.admin) {
    next()
  } else {
    res.redirect("/login")
  }
}

let adminAuth = (req, res, next) => {
  if(req.session.admin) {
    next()
  } else {
    res.redirect("/airline/login")
  }
}
