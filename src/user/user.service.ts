import * as bcrypt from "bcrypt";
import { Model } from "mongoose";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { User } from "./user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async getById(id: string) {
    return this.userModel.findOne({ id });
  }

  async createWithGoogle(email: string, name: string) {
    return this.userModel.create({
      email,
      name,
      isRegisteredWithGoogle: true,
    });
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken: string = await bcrypt.hash(
      refreshToken,
      10,
    );
    await this.userModel.findByIdAndUpdate(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getById(userId);

    // TODO : move this kind of logic into decorators & handle it on Resolver
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async markEmailAsConfirmed(email: string) {
    return this.userModel.updateOne(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }

  async removeRefreshToken(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      currentHashedRefreshToken: null,
    });
  }
}
