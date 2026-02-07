import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();

    await knex("users").insert([
        { 
            email: "admin@foodwaste.com", 
            password: "password123", // for now, but will put bcrypt at authentication level
            role: "admin" 
        },
        { 
            email: "client@test.com", 
            password: "password123", 
            role: "client" 
        }
    ]);
};