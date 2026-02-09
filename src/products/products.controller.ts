import { UseGuards, Controller, Post, Body, Req, Get, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'; 
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';

@ApiTags('products') 
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'See all products with store details' })
  async findAll() {
    return this.productsService.findAll();
  }
  
  @Get('store/:storeId')
  @ApiOperation({ summary: 'See all products for a specific store' })
  async getByStore(@Param('storeId', ParseIntPipe) storeId: number) {
    return this.productsService.findByStore(storeId);
  }

  @ApiBearerAuth() 
  @UseGuards(AuthGuard('jwt')) 
  @Patch(':id/reserve')
  @ApiOperation({ summary: 'Reserve a product (reduces stock and creates reservation)' })
  async reserve(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.productsService.reserveProduct(id, req.user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Add a new product (only for store owner)' })
  async create(@Body() createProductDto: CreateProductDto, @Req() req) {
    return this.productsService.create(createProductDto, req.user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update product details (only for store owner)' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req
  ) {
    return this.productsService.update(id, updateProductDto, req.user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product permanently' })
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.productsService.delete(id, req.user.userId);
  }
}