
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('airlines').del()
    .then(function () {
      // Inserts seed entries
      return knex('airlines').insert([
        {airline: 'United', username: "uAdmin", password: "200united", description: "We be flyin'"},
        {airline: 'Jet Blue', username: "jbAdmin", password: "200jetblue", description: "Up in 'ere"},
        {airline: 'American Airlines', username: "aaAdmin", password: "200american", description: "Losin' my mind"}
      ]);
    });
};
