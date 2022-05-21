import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeResolver } from "./employee.resolver";
import { EmployeeService } from "./employee.service";
import { EmployeeSchema } from "./schemas/employee.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Employee", schema: EmployeeSchema }]),
  ],
  providers: [EmployeeService, EmployeeResolver],
  exports: [EmployeeService, EmployeeResolver],
})
export class EmployeeModule {}
