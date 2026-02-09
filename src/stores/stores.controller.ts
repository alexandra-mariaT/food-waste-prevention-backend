import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Body, Req, Get, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoresDto } from './dto/create_stores.dto';
import { UpdateStoresDto } from './dto/update_stores.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storesService.findOne(id);
  }

  @Post() 
  async create(@Body() createStoreDto: CreateStoresDto, @Req() req) {
    const tempUserId = 1; 
    return this.storesService.create(createStoreDto, tempUserId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoreDto: UpdateStoresDto,
    @Req() req
  ) {
    return this.storesService.update(id, updateStoreDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.storesService.delete(id, req.user.userId);
  }
}