import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateEmployeeInput } from "../graphql";
import { EmployeeService } from "./employee.service";

@Resolver("Employee")
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query("findEmployeeById")
  async findEmployeeById(@Args("id") id: string) {
    return this.employeeService.findById(id);
  }

  @Mutation("createEmployee")
  async createEmployee(@Args("employee") employee: CreateEmployeeInput) {
    return this.employeeService.create(employee);
  }
}
