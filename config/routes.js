const trips = require('../controllers/trips.js');
const airlines = require('../db/airlines.js');

module.exports = function(app){

  app.get('/', trips.index);

  app.get("/login", trips.login);

  app.post("/register", trips.createUser);

  app.post("/login", trips.check);



}
