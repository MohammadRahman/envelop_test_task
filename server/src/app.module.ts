import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ProductsModule, DatabaseModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
