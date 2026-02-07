import { Controller, Post, Body, Req } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoresDto } from './dto/create_stores.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post() 
  async create(@Body() createStoreDto: CreateStoresDto, @Req() req) {
    const tempUserId = 1; 
    return this.storesService.create(createStoreDto, tempUserId);
  }
}