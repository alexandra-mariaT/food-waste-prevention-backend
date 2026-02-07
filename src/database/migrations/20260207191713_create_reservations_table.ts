import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('reservations', (table) => {
    table.increments('id').primary();
    
    table.integer('user_id').unsigned().notNullable()
         .references('id').inTable('users')
         .onDelete('CASCADE');

    table.integer('product_id').unsigned().notNullable()
         .references('id').inTable('products')
         .onDelete('CASCADE');

    table.timestamp('reserved_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('reservations');
}