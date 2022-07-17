import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { SUPPORTED_DOMAINS, UNSUPPORTED_DOMAINS } from "../common/constants";
import { Cookie } from "../graphql";
import { Cookies } from "./cookies.schema";
import { CookiesService } from "./cookies.service";
import { ChromeExtensionGuard } from "./guards/chromeExtension.guard";

@Resolver()
export class CookiesResolver {
  constructor(private readonly cookiesService: CookiesService) {}

  @Mutation("upsertCookie")
  @UseGuards(new ChromeExtensionGuard())
  async upsert(
    @Args("cookies") cookies: Cookie[],
    @Args("domain") domain: string,
    @Args("orgId") orgId: string,
    @Args("email") email: string,
  ): Promise<Cookies> {
    const existingCookie = await this.cookiesService.findByDomainOrgIdEmail(
      domain,
      orgId,
      email,
    );

    if (!existingCookie)
      return this.cookiesService.create(cookies, domain, orgId, email);

    return this.cookiesService.update(existingCookie._id.toString(), cookies);
  }

  @Query("getCookiesByOrgId")
  async getCookiesByOrgId(orgId: string) {
    return this.cookiesService.findEncryptedByOrgId(orgId);
  }

  @Query("getSupportedDomains")
  @UseGuards(new ChromeExtensionGuard())
  getSupportedDomains(): string[] {
    return SUPPORTED_DOMAINS;
  }

  @Query("getUnsupportedDomains")
  @UseGuards(new ChromeExtensionGuard())
  getUnsupportedDomains(): string[] {
    return UNSUPPORTED_DOMAINS;
  }
}
