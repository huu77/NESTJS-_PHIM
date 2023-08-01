import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Cấu hình middleware CORS
  app.enableCors({
    origin: '*' 
  });
  const uploadDirectory = path.join(__dirname, '../uploads');
  app.useStaticAssets(uploadDirectory);
  await app.listen(3000);
  console.log('Ứng dụng đang chạy tại http://localhost:3000');
}
bootstrap();

