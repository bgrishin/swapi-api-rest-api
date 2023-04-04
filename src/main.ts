import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BadRequestFilter } from './common/filters/bad-request.filter';
import { NotFoundFilter } from './common/filters/not-found.filter';
import { DataInterceptor } from './common/interceptors/data.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('APP_PORT') || 3000;
  const swagger = new DocumentBuilder()
    .setTitle('Swapi API (unofficial)')
    .setDescription('API of fetched data from swapi.dev')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, document);

  app
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(new DataInterceptor())
    .useGlobalFilters(new BadRequestFilter(), new NotFoundFilter());

  await app.listen(port, () => {
    Logger.log(`Server is running on ${port} port`);
  });
}
bootstrap();
