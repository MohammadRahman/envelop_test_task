import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './product.repository';
import { DatabaseModule } from 'src/database/database.module';
import { ProductDocument, ProductSchema } from './models/product.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ProductDocument.name, schema: ProductSchema },
    ]),
  ],
  providers: [ProductsService, ProductRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
