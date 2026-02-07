import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();

    await knex("products").insert([
        { 
            name: "Organic Whole Milk", 
            description: "Expiring soon, perfect for baking or pancakes.", 
            price: 5.50, 
            quantity: 10, 
            store_id: 1 
        },
        { 
            name: "Artisan Sourdough Bread", 
            description: "Freshly baked this morning, best consumed within 24h.", 
            price: 12.00, 
            quantity: 5, 
            store_id: 1 
        },
        { 
            name: "Honeycrisp Apples", 
            description: "Slightly bruised, excellent for pies or juice.", 
            price: 4.00, 
            quantity: 25, 
            store_id: 2 
        },
        { 
            name: "Greek Yogurt - Low Fat", 
            description: "Short shelf life, high protein content.", 
            price: 3.50, 
            quantity: 8, 
            store_id: 1 
        }
    ]);
};