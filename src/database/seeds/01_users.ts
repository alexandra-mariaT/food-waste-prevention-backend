import { Knex } from "knex";
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  const hashedPassword = await bcrypt.hash('password123', 10);

  await knex("users").insert([
    { 
      email: 'admin@foodwaste.com', 
      password: hashedPassword, 
      role: 'admin' 
    },
    { 
      email: 'client@test.com', 
      password: hashedPassword, 
      role: 'client' 
    }
  ]);
}