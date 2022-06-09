import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { GoogleAuthController } from "./googleAuth.controller";
import { GoogleAuthService } from "./googleAuth.service";

@Module({
  imports: [ConfigModule, UserModule, AuthModule],
  providers: [GoogleAuthService],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
