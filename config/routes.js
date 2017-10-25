const trips = require('../controllers/trips.js');
const airlines = require('../controllers/airlines.js');

module.exports = function(app){

  app.get('/', trips.index);

  app.get("/login", trips.login);

  app.post("/register", trips.createUser);

  app.post("/login", trips.check);

  app.get("/airline/login", airlines.login);

  app.post("/airline/login", airlines.check);

  app.post("/register/airline", airlines.createAirline)

  app.use(userAuth);

  app.get("/trips", trips.dashboard);

  app.post("/trips", trips.createTrip);

  app.use(adminAuth);

  app.get("/airline", airlines.dashboard)
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
