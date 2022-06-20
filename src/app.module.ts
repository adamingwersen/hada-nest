import { ApolloServerPluginUsageReportingDisabled } from "apollo-server-core";
import * as Joi from "joi";

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmployeeModule } from "./employee/employee.module";
import { OrganisationModule } from "./organisation/organisation.module";
import { CookiesModule } from './cookies/cookies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    OrganisationModule,
    EmployeeModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ["./**/*.graphql"],
      driver: ApolloDriver,
      playground: true,
      plugins: [ApolloServerPluginUsageReportingDisabled()],
    }),
    CookiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
