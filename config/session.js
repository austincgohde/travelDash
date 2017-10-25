const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require("../db/knex.js");

module.exports = (app) => {
  const store = new KnexSessionStore({
    knex: knex,
    tablename: "sessions"
  });

  app.use(session({
    secret: 'keyboard cat',
    cookie: {
      maxAge: 2592000 // 30 Days
    },
    resave: false,
    saveUninitialized: false,
    store: store
  }));
}
