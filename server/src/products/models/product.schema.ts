import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema()
export class ProductDocument extends AbstractDocument {
  @Prop()
  timestamp: Date;
  @Prop()
  product_code: string;
  @Prop()
  roi_percentage: number;
  @Prop()
  roi_state: string;
}
export const ProductSchema = SchemaFactory.createForClass(ProductDocument);
