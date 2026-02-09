import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateStoresDto } from './dto/create_stores.dto';
import { UpdateStoresDto } from './dto/update_stores.dto';

@Injectable()
export class StoresService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll() {
    return this.knex('stores').select('*').orderBy('id', 'desc');
  }

  async findOne(id: number) {
    const store = await this.knex('stores').where({ id }).first();
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} does not exist`);
    }
    return store;
  }

  async create(dto: CreateStoresDto, ownerId: number) {
    const [newStore] = await this.knex('stores')
      .insert({
        name: dto.name,
        address: dto.address,
        owner_id: ownerId,
      })
      .returning('*');
    return newStore;
  }

  async update(id: number, dto: UpdateStoresDto, userId: number) {
    const store = await this.knex('stores').where({ id }).first();

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} does not exist`);
    }

    if (Number(store.owner_id) !== Number(userId)) {
      throw new UnauthorizedException('You do not have permission to update this store');
    }

    const updateData = {
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.address !== undefined && { address: dto.address }),
      updated_at: new Date()
    };

    const [updatedStore] = await this.knex('stores')
      .where({ id })
      .update(updateData)
      .returning('*');

    return updatedStore;
  }

  async delete(id: number, userId: number) {
    const store = await this.knex('stores').where({ id }).first();

    if (!store) {
      throw new NotFoundException(`Store with ID ${id} does not exist`);
    }

    if (Number(store.owner_id) !== Number(userId)) {
      throw new UnauthorizedException('You do not have permission to delete this store');
    }

    await this.knex('stores').where({ id }).del();

    return { message: 'Store deleted successfully' };
  }
}