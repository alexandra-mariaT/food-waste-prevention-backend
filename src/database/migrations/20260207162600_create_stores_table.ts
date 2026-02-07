import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('stores', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('address');
    table.integer('owner_id').notNullable(); // will reference users.id
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('stores');
}