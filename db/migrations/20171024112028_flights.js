
exports.up = function(knex, Promise) {
  return knex.schema.createTable("flights", (table) => {
    table.increments();
    table.string("departure");
    table.string("arrival");
    table.integer("airline_id")
      .notNullable()
      .references("id")
      .inTable("airlines")
      .onDelete("CASCADE")
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("flights");
};
