
exports.up = function(knex, Promise) {
  return knex.schema.createTable("airlines", (table) => {
    table.increments();
    table.string("name");
    table.string("password");
    table.string("description");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("airlines");
};
