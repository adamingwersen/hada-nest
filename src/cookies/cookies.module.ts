import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CookiesResolver } from "./cookies.resolver";
import { Cookies, CookiesSchema } from "./cookies.schema";
import { CookiesService } from "./cookies.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cookies.name, schema: CookiesSchema }]),
  ],
  providers: [CookiesService, CookiesResolver],
  exports: [CookiesService, CookiesResolver],
})
export class CookiesModule {}
