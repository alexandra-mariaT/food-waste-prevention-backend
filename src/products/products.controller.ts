import { Controller, Post, Body, UseGuards, Req, Get, Param, Patch } from '@nestjs/common'; // Am adăugat Get aici
import { AuthGuard } from '@nestjs/passport';
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
async getByStore(@Param('storeId') storeId: string) {
  return this.productsService.findByStore(Number(storeId));
    }

  @UseGuards(AuthGuard('jwt')) 
  @Patch(':id/reserve')
    async reserve(@Param('id') id: string, @Req() req) {
  return this.productsService.reserveProduct(Number(id), req.user.userId);
    }
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() req) {
    return this.productsService.create(createProductDto, req.user.userId);
  }
}