import { ApolloServerPluginUsageReportingDisabled } from "apollo-server-core";

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmployeeModule } from "./employee/employee.module";
import { OrganisationModule } from "./organisation/organisation.module";

const mongodbConnectionString =
  "mongodb+srv://admin:dgiTAFdg9yB5bg@hada-cluster-0.u89nn.mongodb.net/?retryWrites=true&w=majority";

@Module({
  imports: [
    MongooseModule.forRoot(mongodbConnectionString),
    OrganisationModule,
    EmployeeModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ["./**/*.graphql"],
      driver: ApolloDriver,
      playground: true,
      plugins: [ApolloServerPluginUsageReportingDisabled()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
