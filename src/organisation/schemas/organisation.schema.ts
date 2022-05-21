import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  autoCreate: true,
})
export class Organisation extends Document {
  @Prop()
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  industryType: string;

  @Prop({ required: true })
  planTier: string;
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
