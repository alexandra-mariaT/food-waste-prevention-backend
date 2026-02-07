import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class ReservationsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll() {
    return this.knex('reservations')
      .join('users', 'reservations.user_id', 'users.id')
      .join('products', 'reservations.product_id', 'products.id')
      .select(
        'reservations.id',
        'reservations.reserved_at',
        'users.email as user_email',
        'products.name as product_name',
        'products.price as price_at_reservation'
      )
      .orderBy('reservations.id', 'desc');
  }

  async findByUserId(userId: number) {
    return this.knex('reservations')
      .where('reservations.user_id', userId)
      .join('products', 'reservations.product_id', 'products.id')
      .select(
        'reservations.id',
        'reservations.reserved_at',
        'products.name as product_name',
        'products.price'
      )
      .orderBy('reservations.id', 'desc');
  }
}