import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").nullable();
    table.decimal("price", 10, 2).notNullable();
    table.integer("quantity").notNullable().defaultTo(0);
    table.integer("store_id").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
}