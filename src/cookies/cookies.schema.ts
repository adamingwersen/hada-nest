import { Document, Types } from "mongoose";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  autoCreate: true,
})
export class Cookies extends Document {
  @Prop()
  id: Types.ObjectId;

  @Prop({ required: true })
  orgId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  domain: string;

  @Prop({ required: true })
  cookies: Buffer;

  @Prop({ required: true })
  iv: string;
}

export const CookiesSchema = SchemaFactory.createForClass(Cookies);
