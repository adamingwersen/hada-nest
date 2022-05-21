import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { OrganisationModule } from "./organisation/organisation.module";
import { EmployeeModule } from "./employee/employee.module";

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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
