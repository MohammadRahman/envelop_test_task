import { Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import * as joi from 'joi';
@Module({
  imports: [
    NestConfig.forRoot({
      validationSchema: joi.object({
        DB_URI: joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
