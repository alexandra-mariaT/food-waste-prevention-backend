import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard('jwt')) 
  @Patch(':id/reserve')
  async reserve(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.productsService.reserveProduct(id, req.user.userId);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() req) {
    const tempUserId = 1; 
    return this.productsService.create(createProductDto, tempUserId);
  }
}