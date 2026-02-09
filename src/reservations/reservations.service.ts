import { Injectable, NotFoundException } from '@nestjs/common';
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

  async cancel(id: number, userId: number) {
    const reservation = await this.knex('reservations').where({ id }).first();

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} does not exist`);
    }

    if (Number(reservation.user_id) !== Number(userId)) {
      throw new Error('You do not have permission to cancel this reservation');
    }

    const product = await this.knex('products').where({ id: reservation.product_id }).first();

    await this.knex('products')
      .where({ id: reservation.product_id })
      .update({ 
        quantity: product.quantity + 1,
        updated_at: new Date()
      });

    await this.knex('reservations').where({ id }).del();

    return { message: 'Reservation cancelled successfully' };
  }
}