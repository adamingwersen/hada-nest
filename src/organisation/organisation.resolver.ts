import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CreateOrganisationInput } from "../graphql";
import { OrganisationService } from "./organisation.service";

@Resolver("Organisation")
export class OrganisationResolver {
  constructor(private organisationService: OrganisationService) {}

  @Query("findOrganisationById")
  async findOrganisationById(@Args("id") id: string) {
    return this.organisationService.findById(id);
  }

  @Mutation("createOrganisation")
  async createOrganisation(
    @Args("organisation") organisation: CreateOrganisationInput,
  ) {
    return this.organisationService.create(organisation);
  }
}
