import { Model } from "mongoose";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Cookie } from "../graphql";
import { decryptCookies, encryptCookies } from "./cookies.helpers";
import { Cookies } from "./cookies.schema";

@Injectable()
export class CookiesService {
  constructor(
    @InjectModel(Cookies.name)
    private cookiesModel: Model<Cookies>,
  ) {}

  async create(
    cookies: Cookie[],
    domain: string,
    orgId: string,
    email: string,
  ): Promise<Cookies> {
    const [encryptedCookies, iv] = await encryptCookies(
      cookies,
      domain,
      orgId,
      email,
    );

    return this.cookiesModel.create({
      cookies: encryptedCookies,
      iv,
      domain,
      orgId,
      email,
    });
  }

  async update(id: string, cookies: Cookie[]) {
    const existingCookies = await this.cookiesModel.findById(id);

    if (!existingCookies) throw new Error(`Cookie with id ${id} not found`);

    const decryptedCookies = await decryptCookies(existingCookies);

    const updatedCookies = cookies.map((cookie) => {
      const matchingNewCookie = decryptedCookies.find(
        (newCookie) => cookie.name === newCookie.name,
      );
      if (matchingNewCookie) return matchingNewCookie;

      return cookie;
    });

    const { domain, orgId, email } = existingCookies;
    const [encryptedCookies, iv] = await encryptCookies(
      updatedCookies,
      domain,
      orgId,
      email,
    );

    return this.cookiesModel.findByIdAndUpdate(id, {
      cookies: encryptedCookies,
      iv,
    });
  }

  async findByDomainOrgIdEmail(domain: string, orgId: string, email: string) {
    return this.cookiesModel.findOne({ domain, orgId, email });
  }

  async findEncryptedByOrgId(orgId: string) {
    return this.cookiesModel.find({ orgId });
  }
}
