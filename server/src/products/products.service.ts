import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}
  create(createProductDto) {
    return this.productRepository.create(createProductDto);
  }

  findAll() {
    return this.productRepository.find({});
  }
}
