import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create(dto: CreateUserDto) {
  const hashedPassword = await bcrypt.hash(dto.password, 10);
  
  const [newUser] = await this.knex('users')
    .insert({
      ...dto,
      password: hashedPassword
    })
    .returning(['id', 'email', 'role']);
    
  return newUser;
}

  async findByEmail(email: string) {
    return this.knex('users').where({ email }).first();
  }

  async findOne(id: number) {
    return this.knex('users').where({ id }).first();
  }
}