import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Cookie, CreateCookieInput } from "../graphql";
import { ChromeExtensionGuard } from "./guards/chromeExtension.guard";

@Resolver()
export class CookiesResolver {
  constructor() {}

  @Mutation("createCookie")
  @UseGuards(new ChromeExtensionGuard())
  create(@Args("cookie") cookie: CreateCookieInput): Cookie {
    return cookie;
  }
}
