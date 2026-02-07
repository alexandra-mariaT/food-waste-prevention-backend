import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateStoresDto } from './dto/create_stores.dto';

@Injectable()
export class StoresService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

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
}