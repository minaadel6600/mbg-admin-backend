import { NextFunction, Request, Response } from "express";
import HttpError from "../models/error.model";
import { getTranslatedMessage } from "../utils/locales/translate-helpers";
import { role } from "../models/user.model";
import IRequest from "../interfaces/i-request";

const AuthorizeRole = (allowedRoles: role[]) => {

  return async (req: IRequest, res: Response, next: NextFunction) => {

    try {
      console.log(req.user?.roles)
      const userRoles = req.user?.roles || [];
      // if not at least one role exist in allowed roles then break the process
      if (!userRoles.some((r) => allowedRoles.includes(r))) {
        throw new HttpError(403,
          getTranslatedMessage("ar", 'USER_UNAUTHORIZED')
        );
      }
      next();
    } catch (error) {
      next(error)
    }


  }

};



export default AuthorizeRole;