import { LanguageSupportedRepository } from './repositories/language-supported.repository';
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  LanguageSupported,
  LanguageSupportedSchema,
} from "./schemas/language-supported.schema";
import { Translation, TranslationSchema } from "./schemas/translation.schema";
import { LanguageSupportedService } from "./services/language-supported.service";
import { LanguageSupportedSeedingService } from "./services/language-supported-seeding.service";
import { TranslationRepository } from './repositories/translation.repository';
import { LocalizationController } from './controllers/localization.controller';
import { TranslationController } from './controllers/translation.controller';
import { TranslationService } from './services/translation.service';
import { TranslaterService } from './services/translater.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LanguageSupported.name, schema: LanguageSupportedSchema },
      { name: Translation.name, schema: TranslationSchema },
    ]),
  ],
  providers: [LanguageSupportedRepository, TranslationRepository, LanguageSupportedService, LanguageSupportedSeedingService, TranslationService, TranslaterService],
  controllers: [LocalizationController, TranslationController],
  exports: [TranslaterService],
})
export class LzmModule { }
