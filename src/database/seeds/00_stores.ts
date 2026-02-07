import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("stores").del();

    await knex("stores").insert([
        { name: "Downtown Eco-Market", address: "123 Green St, City Center", owner_id: 1 },
        { name: "Westside Surplus Foods", address: "456 West Ave, Industrial District", owner_id: 2 }
    ]);
};