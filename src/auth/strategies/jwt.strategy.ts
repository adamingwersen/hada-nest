import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { UserService } from "../../user/user.service";
import { TokenPayload } from "../auth.interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      secret: (configService: ConfigService) =>
        configService.get<string>("JWT_SECRET"),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log({ request });
          if (!request?.cookies) return;
          if (!request.cookies?.Authentication) return;
          return request.cookies?.Authentication;
        },
      ]),
    });
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload.userId);
  }
}
