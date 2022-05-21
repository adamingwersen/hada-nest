import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEmployeeInput, Employee } from "../graphql";
import { Employee as EmployeeModel } from "./schemas/employee.schema";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel("Employee")
    private EmployeeModel: Model<EmployeeModel>,
  ) {}

  async create(createEmployeeInput: CreateEmployeeInput): Promise<Employee> {
    return this.EmployeeModel.create({ ...createEmployeeInput });
  }

  async findById(id: string): Promise<Employee> {
    return this.EmployeeModel.findById<Employee>(id);
  }
}
