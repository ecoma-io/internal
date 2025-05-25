/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PinoLogger } from "./core/logger/pino.logger";

async function bootstrap() {
  const logger = new PinoLogger("Bootstrap");
  const app = await NestFactory.create(AppModule, { logger });
  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");
  logger.log(`Application is running on ${port}`);
}

bootstrap();
