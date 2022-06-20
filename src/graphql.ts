
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateCookieInput {
    name: string;
    value: string;
    domain: string;
    path?: Nullable<string>;
    expires?: Nullable<string>;
    httpOnly?: Nullable<boolean>;
    secure?: Nullable<boolean>;
    sameSite?: Nullable<string>;
    hostOnly?: Nullable<boolean>;
    session?: Nullable<boolean>;
    storeId?: Nullable<string>;
}

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

export abstract class IMutation {
    abstract createCookie(cookie?: Nullable<CreateCookieInput>): Nullable<Cookie> | Promise<Nullable<Cookie>>;

    abstract createEmployee(employee?: Nullable<CreateEmployeeInput>): Nullable<Employee> | Promise<Nullable<Employee>>;

    abstract authenticate(token: string): AuthenticateResponse | Promise<AuthenticateResponse>;

    abstract createOrganisation(organisation?: Nullable<CreateOrganisationInput>): Organisation | Promise<Organisation>;
}

export class Cookie {
    name: string;
    value: string;
    domain: string;
    path?: Nullable<string>;
    expires?: Nullable<string>;
    httpOnly?: Nullable<boolean>;
    secure?: Nullable<boolean>;
    sameSite?: Nullable<string>;
    hostOnly?: Nullable<boolean>;
    session?: Nullable<boolean>;
    storeId?: Nullable<string>;
}

export abstract class IQuery {
    abstract findEmployeeById(id: string): Nullable<Employee> | Promise<Nullable<Employee>>;

    abstract findOrganisationById(id: string): Organisation | Promise<Organisation>;
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

export class AuthenticateResponse {
    success: boolean;
}

export class Organisation {
    _id?: Nullable<string>;
    name: string;
    industryType: string;
    planTier: string;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class User {
    _id: string;
    name: string;
    email: string;
}

type Nullable<T> = T | null;
