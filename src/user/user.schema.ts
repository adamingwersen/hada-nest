import { Document, Types } from "mongoose";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  autoCreate: true,
})
export class User extends Document {
  @Prop()
  id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop({ default: false })
  isRegisteredWithGoogle: boolean;

  @Prop()
  currentHashedRefreshToken: string;

  @Prop()
  isEmailConfirmed: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
