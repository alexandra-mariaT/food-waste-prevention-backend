import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();

    // Lookup store ids by name to avoid depending on fixed auto-increment values
    const downtown = await knex('stores').where({ name: 'Downtown Eco-Market' }).first();
    const westside = await knex('stores').where({ name: 'Westside Surplus Foods' }).first();

    const downtownId = downtown ? downtown.id : null;
    const westsideId = westside ? westside.id : null;

    await knex("products").insert([
        { 
            name: "Organic Whole Milk", 
            description: "Expiring soon, perfect for baking or pancakes.", 
            price: 5.50, 
            quantity: 10, 
            store_id: downtownId 
        },
        { 
            name: "Artisan Sourdough Bread", 
            description: "Freshly baked this morning, best consumed within 24h.", 
            price: 12.00, 
            quantity: 5, 
            store_id: downtownId 
        },
        { 
            name: "Honeycrisp Apples", 
            description: "Slightly bruised, excellent for pies or juice.", 
            price: 4.00, 
            quantity: 25, 
            store_id: westsideId 
        },
        { 
            name: "Greek Yogurt - Low Fat", 
            description: "Short shelf life, high protein content.", 
            price: 3.50, 
            quantity: 8, 
            store_id: downtownId 
        }
    ]);
};