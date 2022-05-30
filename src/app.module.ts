import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmployeeModule } from "./employee/employee.module";
import { OrganisationModule } from "./organisation/organisation.module";

@Module({
  imports: [
    OrganisationModule,
    EmployeeModule,
    MongooseModule.forRoot(
      "mongodb+srv://adamildk:cdTwPPHR6DfO3Qd6@hada-cluster-0.u89nn.mongodb.net/?retryWrites=true&w=majority",
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ["./**/*.graphql"],
      driver: ApolloDriver,
      playground: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
