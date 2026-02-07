import { Controller, Post, Body, Req, Get, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create_product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get() 
  async findAll() {
    return this.productsService.findAll();
  }
  
  @Get('store/:storeId')
  async getByStore(@Param('storeId', ParseIntPipe) storeId: number) {
    return this.productsService.findByStore(storeId);
  }

  @Patch(':id/reserve')
  async reserve(@Param('id', ParseIntPipe) id: number, @Req() req) {
    // until we have authentication, we'll use a hardcoded user ID for testing
    const tempUserId = 6; 
    return this.productsService.reserveProduct(id, tempUserId);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() req) {
    const tempUserId = 1; 
    return this.productsService.create(createProductDto, tempUserId);
  }
}