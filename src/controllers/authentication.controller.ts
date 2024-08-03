import { Request, Response, NextFunction } from 'express';
import AuthenticationService, { ICookieData } from '../services/authentication.service';
import LogInDto from '../dtos/login.dto';
import CreateUserDtoSchema from '../dtos/create-user.dto';
import LoginDtoSchema from '../dtos/login.dto';
import { generateAccessToken } from '../utils/jwt/helpers/access-token.helper';
import { generateRefreshToken } from '../utils/jwt/helpers/refresh-token.helper';
import { resSuccess } from '../utils/response.helper';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';
import IRequest from '../interfaces/i-request';
import { ACCESS_TOKEN_TIME_IN_HOURS, REFRESH_TOKEN_TIME_IN_DAYS } from '../globals/constants';

class AuthenticationController {

  public authenticationService = new AuthenticationService();

  public registration = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    try {
      const {
        //  cookie,
        user,
      } = await this.authenticationService.registerService(req, userData);
      //res.setHeader('Set-Cookie', [cookie]);
      res.send({ user });
    } catch (error) {
      next(error);
    }
  }


  public logIn = async (req: IRequest, res: Response, next: NextFunction) => {

    try {
      const logInData = req.body;
      const user = await this.authenticationService.loginService(req, logInData);
      const JWTPayload = { id: user._id };
      const accessToken = generateAccessToken(JWTPayload, ACCESS_TOKEN_TIME_IN_HOURS + 'h');
      const refreshToken = generateRefreshToken(JWTPayload, REFRESH_TOKEN_TIME_IN_DAYS + 'd');

      let cookie = this.authenticationService.createCookie(refreshToken, REFRESH_TOKEN_TIME_IN_DAYS)
      res.setHeader('Set-Cookie', [cookie]);

      const message = getTranslatedMessage("ar", 'USER_LOGGED_SUCCESS');


      return resSuccess(req, res, 200, message, { accessToken, refreshToken });

    } catch (error) {
      next(error);
    }

  }

  public refreshTokens = async (req: IRequest, res: Response, next: NextFunction) => {

    try {

      const oldRefreshToken = req.cookies['Refresh-Token'];
      const user = await this.authenticationService.verifyRefreshTokenService(oldRefreshToken);
      const JWTPayload = { id: user._id };
      const accessToken = generateAccessToken(JWTPayload, ACCESS_TOKEN_TIME_IN_HOURS + 'h');
      const refreshToken = generateRefreshToken(JWTPayload, REFRESH_TOKEN_TIME_IN_DAYS + 'd');

      let cookie = this.authenticationService.createCookie(refreshToken, 5)
      res.setHeader('Set-Cookie', [cookie]);

      const message = getTranslatedMessage('ar', 'TOKENS_GENERATED_SUCCESS');
      return resSuccess(req, res, 200, message, { accessToken, refreshToken });

    } catch (error) {
      next(error);
    }

  }

}

export default AuthenticationController;
