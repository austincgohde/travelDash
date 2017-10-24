const knex = require('knex');

module.exports = {

  login: (req, res) => {
    res.render("airLogin");
  },

  check: (req, res) => {
    knex("airlines")
      .where("")
  }
}
