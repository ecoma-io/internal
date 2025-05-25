import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { appConfig, MongoDBConfig, mongoDBConfig } from "./config";
import { HealthyModule } from "./core/healthy/healthy.module";
import { IamModule } from "./domains/iam/iam.module";
import { LzmModule } from "./domains/lzm/lzm.module";
import { NdmModule } from "./domains/ndm/ndm.module";


@Module({
  imports: [
    HealthyModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mongoDBConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<MongoDBConfig>("mongodb");
        return {
          uri: config.uri,
          dbName: config.dbName,
        };
      },
    }),
    IamModule,
    NdmModule,
    LzmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
