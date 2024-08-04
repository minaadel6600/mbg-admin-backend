import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import userModel, { IUser } from './../models/user.model';
import HttpError from '../models/error.model';
import { REFRESH_TOKEN_SECRET } from '../globals/constants';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';
import { UserRepository } from '../db-repositories/user.repo';
import { string } from 'joi';
import IRequest from '../interfaces/i-request';


export interface ICookieData {
  token: string;
  expiresIn: number;
}


class AuthenticationService {
  private userRepository = new UserRepository();

  public async registerService(req: any, userData: IUser) {
    if (
      await this.userRepository.getOne({ mobile: userData.mobile })
    ) {
      throw new HttpError(400, getTranslatedMessage("ar", 'MOBILE_ALREADY_REGISTERED') + ' ' + userData.mobile);
    }
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    let user = await this.userRepository.Create(userData);
    return { user };
  }

  public async loginService(req: IRequest, loginData: { mobile: string, password: string }) {

 
    const user = await this.userRepository.getOne({ mobile: loginData.mobile });

    if (!user) throw new HttpError(404, getTranslatedMessage("ar", "EMAIL_PASSWORD_INVALID"));

    let isPasswordMatching = false;
    if (user.password) {
      isPasswordMatching = await bcrypt.compare(
        loginData.password,
        user.password,
      );
    }


    if (!isPasswordMatching) throw new HttpError(404, "EmailOrPasswordInvalid");

    return user;
  }

  public async verifyRefreshTokenService(token: string) {

    let decodedPayload: any = await jwt.verify(token, REFRESH_TOKEN_SECRET);
    if (!decodedPayload) throw new HttpError(500, 'invalid refresh token')
    let user = await this.userRepository.getById(decodedPayload.id);
    if (!user) throw new HttpError(500, 'invalid refresh token')

    return user;
  }
  public createCookie(token: string, timeInDays: number) {
    let tokenData: ICookieData = { token: token, expiresIn: timeInDays * 60 * 60 * 24 } // 5 days

    return `Refresh-Token=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}

export default AuthenticationService;
