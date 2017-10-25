
exports.up = function(knex, Promise) {
  return knex.schema.createTable("trips", (table) => {
    table.increments();
    table.integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
    table.string("title");
    table.string("destination");
    table.string("description");
    table.integer("flight_id")
      .notNullable()
      .references("id")
      .inTable("flights")
      .onDelete("CASCADE")
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("trips");
};
