import { registerAs } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, Matches, validateSync } from "class-validator";

/* eslint-disable @typescript-eslint/naming-convention */
class EnvironmentVariables {
  @IsString()
  @Matches(/^redis(s)?:\/\//, {
    message:
      "REDIS_URI must be a valid Redis connection string starting with redis:// or rediss://",
  })
  @IsNotEmpty()
  REDIS_URI: string;
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

export const redisConfig = registerAs(
  "redis",
  () => {
    const env = validatedEnviroments();
    return {
      uri: env.REDIS_URI,
      db: 0,
    };
  }
);
