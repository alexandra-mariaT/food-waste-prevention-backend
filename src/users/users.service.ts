import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    const [newUser] = await this.knex('users')
      .insert({
        email: createUserDto.email,
        password: createUserDto.password, // will add bcrypt here later
        role: createUserDto.role,
      })
      .returning('*');
    return newUser;
  }

  async findByEmail(email: string) {
    return this.knex('users').where({ email }).first();
  }

  async findOne(id: number) {
    return this.knex('users').where({ id }).first();
  }
}