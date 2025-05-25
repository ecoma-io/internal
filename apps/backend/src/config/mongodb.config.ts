import { registerAs } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, Matches, validateSync } from "class-validator";

/* eslint-disable @typescript-eslint/naming-convention */
class EnvironmentVariables {
  @IsString()
  @Matches(/^mongodb(\+srv)?:\/\//, {
    message:
      "MONGODB_URI must be a valid MongoDB connection string starting with mongodb:// or mongodb+srv://",
  })
  @IsNotEmpty()
  MONGODB_URI: string;
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

export class MongoDBConfig {
  uri: string;
  dbName: string;
}

export const mongoDBConfig = registerAs(
  "mongodb",
  (): MongoDBConfig => {
    const enviroments = validatedEnviroments();
    return {
      uri: enviroments.MONGODB_URI,
      dbName: "ecoma",
    };
  }
);
