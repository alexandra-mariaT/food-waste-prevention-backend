import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("reservations").del();

  const user = await knex("users").where({ role: 'client' }).first();
  const product = await knex("products").first();

  if (user && product) {
    await knex("reservations").insert([
      {
        user_id: user.id,
        product_id: product.id,
        reserved_at: new Date()
      }
    ]);
  }
}