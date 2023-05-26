import { Logger } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';
import { FilterQuery, Model, Types } from 'mongoose';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument[]> {
    const createdDocument = await this.model.insertMany(document);
    return createdDocument;
  }
  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return await this.model.find({}, {}, { lean: true });
  }
}
