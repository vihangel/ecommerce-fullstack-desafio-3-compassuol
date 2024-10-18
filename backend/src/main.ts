import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT; // Porta na qual a aplicação vai rodar
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  // Habilitar CORS para permitir requisições de origens diferentes
  app.enableCors();

  // Definir a pasta estática onde os uploads estarão disponíveis
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  // Iniciar a aplicação e escutar na porta especificada
  await app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`); // Mensagem para indicar que a aplicação está rodando
  });
}
bootstrap();
