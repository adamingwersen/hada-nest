import { IncomingMessage } from "http";

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlContextType } from "@nestjs/graphql";

@Injectable()
export class ChromeExtensionGuard implements CanActivate {
  constructor() {}
  canActivate(host: ExecutionContext) {
    if (host.getType<GqlContextType>() !== "graphql") return false;
    const { req }: { req: IncomingMessage } = host.getArgByIndex(2);

    const rawHeaders = req?.rawHeaders;
    if (!rawHeaders.includes(process.env.CHROME_EXTENSION_CONTEXT))
      return false;

    // TODO: check logged in user comes from an existing org

    return true;
  }
}
