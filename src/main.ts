import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PasswordInterceptor } from './users/interceptors/password.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new PasswordInterceptor());
  await app.listen(3000);
}
bootstrap();
