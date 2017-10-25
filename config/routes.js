//Update the name of the controller below and rename the file.
const trips = require("../controllers/trips.js")
const airlines = require('../controllers/airlines');

module.exports = function(app){

  app.get('/', trips.index);

  app.get("/login", trips.login);

  app.post("/register", trips.createUser);

  app.post("/login", trips.check);



}
