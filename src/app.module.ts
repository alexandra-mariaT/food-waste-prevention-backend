import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KnexModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          client: 'postgres',
          connection: {
            host: configService.get<string>('DB_HOST'),
            user: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            port: configService.get<number>('DB_PORT'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    StoresModule,
  ],
})
export class AppModule {}