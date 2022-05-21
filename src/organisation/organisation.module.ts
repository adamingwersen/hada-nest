import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';

@Module({
  providers: [OrganisationService],
  exports: [OrganisationService],
})
export class OrganisationModule {}
