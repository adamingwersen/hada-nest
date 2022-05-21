import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateOrganisationInput, Organisation } from "../graphql";
import { Organisation as OrganisationModel } from "./schemas/organisation.schema";

@Injectable()
export class OrganisationService {
  constructor(
    @InjectModel("Organisation")
    private organisationModel: Model<OrganisationModel>,
  ) {}

  async create(
    createOrganisationInput: CreateOrganisationInput,
  ): Promise<Organisation> {
    return this.organisationModel.create({ ...createOrganisationInput });
  }

  async findById(id: string): Promise<Organisation> {
    return this.organisationModel.findById<Organisation>(id);
  }
}
