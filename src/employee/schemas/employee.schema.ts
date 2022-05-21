import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Department } from "../../graphql";

@Schema({
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  autoCreate: true,
})
export class Employee extends Document {
  @Prop()
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  departments: Department[];

  @Prop({ required: true })
  hireDate: Date;

  @Prop()
  endDate: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
