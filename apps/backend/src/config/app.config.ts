import { registerAs } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { IsInt, Max, Min, validateSync } from "class-validator";

/* eslint-disable @typescript-eslint/naming-convention */
class EnvironmentVariables {
  @IsInt()
  @Min(0)
  @Max(65535)
  PORT: number;
}
/* eslint-enable @typescript-eslint/naming-convention */

function validatedEnviroments(): EnvironmentVariables {
  // Tạo một bản sao của process.env để gán giá trị mặc định
  const envWithDefaults = {
    ...process.env,
    PORT: process.env.PORT || "3000",
  };

  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    envWithDefaults, // Sử dụng bản sao đã có giá trị mặc định
    { enableImplicitConversion: true }
  );
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export class AppConfig {
  port: number;
}

export const appConfig = registerAs("app", (): AppConfig => {
  const enviroments = validatedEnviroments();
  return {
    port: +enviroments.PORT,
  };
});
