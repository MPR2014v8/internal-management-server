import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || `http://localhost:3001`, // Allow frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies & auth headers
  });

  const port = process.env.PORT || 3002;
  console.log(
    `Connecting to database: ${process.env.DB_NAME} at ${process.env.URL_DB}:${process.env.PORT_DB}`,
  );
  console.log(
    `Using credentials - User: ${process.env.USER_DB}, Password: ${process.env.PASS_DB}`,
  );

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);

  console.log({
    origin: process.env.FRONTEND_URL || `http://localhost:3001`, // Allow frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies & auth headers
  });
}

bootstrap();
