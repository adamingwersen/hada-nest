import { Module } from "@nestjs/common";

import { CookiesResolver } from "./cookies.resolver";
import { CookiesService } from "./cookies.service";

@Module({
  providers: [CookiesService, CookiesResolver],
  exports: [CookiesService],
})
export class CookiesModule {}
