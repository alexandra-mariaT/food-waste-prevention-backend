exports.up = function(knex) {
  return knex.schema.createTable('stores', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('address');
    table.integer('owner_id').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('stores');
};