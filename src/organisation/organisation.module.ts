import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrganisationResolver } from "./organisation.resolver";
import { OrganisationService } from "./organisation.service";
import { OrganisationSchema } from "./schemas/organisation.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Organisation", schema: OrganisationSchema },
    ]),
  ],
  providers: [OrganisationService, OrganisationResolver],
  exports: [OrganisationService, OrganisationResolver],
})
export class OrganisationModule {}
