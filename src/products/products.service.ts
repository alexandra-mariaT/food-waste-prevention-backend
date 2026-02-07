import { 
  Injectable, 
  UnauthorizedException, 
  NotFoundException, 
  BadRequestException 
} from '@nestjs/common'; 
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateProductDto } from './dto/create_product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll() {
    return this.knex('products')
      .leftJoin('stores', 'products.store_id', 'stores.id')
      .select(
        'products.id',
        'products.name',
        'products.description',
        'products.price',
        'products.quantity',
        'stores.name as store_name',
        'stores.address as store_address'
      )
      .orderBy('products.id', 'desc');
  }

  async findByStore(storeId: number) {
    return this.knex('products')
      .where({ store_id: storeId })
      .select('*')
      .orderBy('id', 'desc');
  }

  async create(dto: CreateProductDto, userId: number) {
    try {
      const store = await this.knex('stores').where({ id: dto.store_id }).first();
      
      if (!store) {
        throw new NotFoundException(`Store with ID ${dto.store_id} does not exist`);
      }

      if (Number(store.owner_id) !== Number(userId)) {
        throw new UnauthorizedException('You do not have permission to add products to this store');
      }

      const [newProduct] = await this.knex('products')
        .insert({
          name: dto.name,
          description: dto.description,
          price: dto.price,
          quantity: dto.quantity,
          store_id: dto.store_id
        })
        .returning('*');

      return newProduct;
    } catch (error) {
      console.error('DATABASE ERROR:', error.message);
      throw error;
    }
  }

  async reserveProduct(productId: number, userId: number) {
    return await this.knex.transaction(async (trx) => {
      const product = await trx('products').where({ id: productId }).forUpdate().first();

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.quantity <= 0) {
        throw new BadRequestException('The product is out of stock');
      }

      const [updatedProduct] = await trx('products')
        .where({ id: productId })
        .update({ 
          quantity: product.quantity - 1,
          updated_at: new Date() 
        })
        .returning('*');

      const [reservation] = await trx('reservations')
        .insert({
          user_id: userId,
          product_id: productId
        })
        .returning('*');

      return {
        message: 'Reservation confirmed and saved in history!',
        reservation_details: {
          id: reservation.id,
          product: updatedProduct.name,
          new_quantity: updatedProduct.quantity,
          timestamp: reservation.created_at || new Date()
        }
      };
    });
  }
}