import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Food Waste Prevention API')
    .setDescription('API-ul pentru rezervarea produselor care expiră curând')
    .setVersion('1.0')
    .addBearerAuth() // it adds the Authorization header with the Bearer scheme to Swagger UI, allowing us to input a JWT token for authenticated endpoints
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(3000);
}
bootstrap();