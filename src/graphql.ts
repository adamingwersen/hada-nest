
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class DepartmentInput {
    name: string;
}

export class CreateEmployeeInput {
    name: string;
    position: string;
    departments?: Nullable<DepartmentInput[]>;
    hireDate: Date;
}

export class CreateOrganisationInput {
    name: string;
    industryType: string;
    planTier: string;
}

export abstract class IQuery {
    abstract findEmployeeById(id: string): Nullable<Employee> | Promise<Nullable<Employee>>;

    abstract findOrganisationById(id: string): Organisation | Promise<Organisation>;
}

export abstract class IMutation {
    abstract createEmployee(employee?: Nullable<CreateEmployeeInput>): Nullable<Employee> | Promise<Nullable<Employee>>;

    abstract createOrganisation(organisation?: Nullable<CreateOrganisationInput>): Organisation | Promise<Organisation>;
}

export class Department {
    name: string;
}

export class Employee {
    _id?: Nullable<string>;
    name: string;
    position: string;
    departments?: Nullable<Department[]>;
    hireDate: Date;
    endDate?: Nullable<Date>;
}

export class Organisation {
    _id?: Nullable<string>;
    name: string;
    industryType: string;
    planTier: string;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

type Nullable<T> = T | null;
