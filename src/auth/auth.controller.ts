import { Request } from "express";

import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";

import { User } from "../graphql";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import JwtAuthenticationGuard from "./guards/jwt.guard";

interface RequestWithUser extends Request {
  user: User;
}

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @HttpCode(200)
  @Post("login")
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user._id.toString(),
    );

    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user._id.toString());

    await this.userService.setCurrentRefreshToken(
      refreshToken,
      user._id.toString(),
    );

    request.res.setHeader("Set-Cookie", [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post("logout")
  @HttpCode(200)
  async logout(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user._id.toString());
    request.res.setHeader("Set-Cookie", this.authService.getCookiesForLogOut());
  }
}
