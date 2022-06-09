import { Request } from "express";

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseInterceptors
} from "@nestjs/common";

import { GoogleAuthService } from "./googleAuth.service";
import TokenVerificationDto from "./tokenVerification.dto";

@Controller("google-authentication")
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post()
  async authenticate(
    @Body() tokenData: TokenVerificationDto,
    @Req() request: Request,
  ) {
    const { accessTokenCookie, refreshTokenCookie, user } =
      await this.googleAuthService.authenticate(tokenData.token);

    request.res.setHeader("Set-Cookie", [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    return user;
  }
}
