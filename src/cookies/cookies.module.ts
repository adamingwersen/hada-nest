import { Module } from '@nestjs/common';
import { CookiesService } from './cookies.service';
import { CookiesController } from './cookies.controller';
import { CookiesResolver } from './cookies.resolver';

@Module({
  providers: [CookiesService, CookiesResolver],
  controllers: [CookiesController]
})
export class CookiesModule {}
