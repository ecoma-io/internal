import { registerAs } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, Matches, validateSync } from "class-validator";

/* eslint-disable @typescript-eslint/naming-convention */
class EnvironmentVariables {
  @IsString()
  @Matches(/^amqp(s)?:\/\//, {
    message:
      "RABBITMQ_URI must be a valid RabbitMQ connection string starting with amqp:// or amqps://",
  })
  @IsNotEmpty()
  RABBITMQ_URI: string;
}
/* eslint-enable @typescript-eslint/naming-convention */

function validatedEnviroments(): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, process.env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export class RabbitMQConfig {
  uri: string
}

export const rabbitMQConfig = registerAs(
  "rabbitmq",
  (): RabbitMQConfig => {
    const env = validatedEnviroments();
    return {
      uri: env.RABBITMQ_URI,
    };
  }
);
