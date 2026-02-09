import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.knex('users').where({ id }).first();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }

    const updateData: any = {};

    if (dto.email !== undefined) {
      const existingUser = await this.knex('users').where({ email: dto.email }).first();
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already in use');
      }
      updateData.email = dto.email;
    }

    if (dto.password !== undefined) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return user;
    }

    const [updatedUser] = await this.knex('users')
      .where({ id })
      .update({ ...updateData, updated_at: new Date() })
      .returning(['id', 'email', 'role']);

    return updatedUser;
  }
}