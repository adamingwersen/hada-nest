import { Auth, google } from "googleapis";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "../auth/auth.service";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";

@Injectable()
export class GoogleAuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const clientID: string = this.configService.get("GOOGLE_CLIENT_ID");
    const clientSecret: string = this.configService.get("GOOGLE_CLIENT_SECRET");

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2("v2").userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

  async getCookiesForUser(user: User) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id.toString(),
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id.toString());

    await this.userService.setCurrentRefreshToken(
      refreshToken,
      user.id.toString(),
    );

    return {
      accessTokenCookie,
      refreshTokenCookie,
    };
  }

  async handleRegisteredUser(user: User) {
    if (!user.isRegisteredWithGoogle) {
      throw new UnauthorizedException();
    }

    const { accessTokenCookie, refreshTokenCookie } =
      await this.getCookiesForUser(user);

    return {
      accessTokenCookie,
      refreshTokenCookie,
      user,
    };
  }

  async registerUser(token: string, email: string) {
    const userData = await this.getUserData(token);
    const name = userData.name;

    const user = await this.userService.createWithGoogle(email, name);

    return this.handleRegisteredUser(user);
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    try {
      const user = await this.userService.getByEmail(email);

      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error?.status !== 404) {
        throw new error();
      }

      return this.registerUser(token, email);
    }
  }
}
