import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Delete, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.reservationsService.findByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  cancel(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.reservationsService.cancel(id, req.user.userId);
  }
}