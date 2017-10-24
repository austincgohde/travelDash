
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('airlines').del()
    .then(function () {
      // Inserts seed entries
      return knex('airlines').insert([
        {name: 'United', password: "200united", description: "We be flyin'"},
        {name: 'Jet Blue', password: "200jetblue", description: "Up in 'ere"},
        {name: 'American Airlines', password: "200american", description: "Losin' my mind"}
      ]);
    });
};
