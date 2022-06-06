import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { OrganisationResolver } from "./organisation.resolver";
import { OrganisationService } from "./organisation.service";
import { Organisation, OrganisationSchema } from "./schemas/organisation.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
    ]),
  ],
  providers: [OrganisationService, OrganisationResolver],
  exports: [OrganisationService, OrganisationResolver],
})
export class OrganisationModule {}
