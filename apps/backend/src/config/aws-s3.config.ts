import { registerAs } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, validateSync } from "class-validator";

/* eslint-disable @typescript-eslint/naming-convention */
class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  ENDPOINT: string;

  @IsString()
  @IsNotEmpty()
  ACCESSKEY: string;

  @IsString()
  @IsNotEmpty()
  SECRETKEY: string;

  @IsString()
  @IsNotEmpty()
  BUCKET: string;

  @IsString()
  @IsOptional()
  REGION?: string;

  @IsString()
  @IsOptional()
  FORCE_PATH_STYLE?: string;

  @IsString()
  @IsOptional()
  SIGNATURE_VERSION?: string;
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

export const awsS3Config = registerAs(
  "s3",
  () => {
    const enviroments = validatedEnviroments();
    return {
      endpoint: enviroments.ENDPOINT,
      accessKey: enviroments.ACCESSKEY,
      secretKey: enviroments.SECRETKEY,
      bucket: enviroments.BUCKET,
      region: enviroments.REGION || "ap-southeast-1",
      
    };
  }
);
