
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
    expirationDate?: Nullable<number>;
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
    abstract upsertCookie(cookies: CreateCookieInput[], domain: string, orgId: string, email: string): Nullable<CookieCollection> | Promise<Nullable<CookieCollection>>;

    abstract createEmployee(employee?: Nullable<CreateEmployeeInput>): Nullable<Employee> | Promise<Nullable<Employee>>;

    abstract authenticate(token: string): AuthenticateResponse | Promise<AuthenticateResponse>;

    abstract createOrganisation(organisation?: Nullable<CreateOrganisationInput>): Organisation | Promise<Organisation>;
}

export abstract class IQuery {
    abstract getSupportedDomains(): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract getUnsupportedDomains(): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract getCookiesByOrgId(orgId: string): Nullable<Nullable<CookieCollection>[]> | Promise<Nullable<Nullable<CookieCollection>[]>>;

    abstract findEmployeeById(id: string): Nullable<Employee> | Promise<Nullable<Employee>>;

    abstract findOrganisationById(id: string): Organisation | Promise<Organisation>;
}

export class CookieCollection {
    _id?: Nullable<string>;
    orgId: string;
    email: string;
    domain: string;
    cookies: Cookie[];
    iv?: Nullable<string>;
}

export class Cookie {
    name: string;
    value: string;
    domain: string;
    path?: Nullable<string>;
    expirationDate?: Nullable<number>;
    httpOnly?: Nullable<boolean>;
    secure?: Nullable<boolean>;
    sameSite?: Nullable<string>;
    hostOnly?: Nullable<boolean>;
    session?: Nullable<boolean>;
    storeId?: Nullable<string>;
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
