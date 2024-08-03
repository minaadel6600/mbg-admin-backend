import { NextFunction, Response } from "express";
import IRequest from "../interfaces/i-request";
import HttpError from "../models/error.model";
import { getTranslatedMessage } from "../utils/locales/translate-helpers";
import { getUserPayloadFromAccessToken, verifyAccessToken } from "../utils/jwt/helpers/access-token.helper";
import logger from "../utils/logger";
import { UserRepository } from "../db-repositories/user.repo";




const auth = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        let userRepository = new UserRepository();
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) throw new HttpError(401, getTranslatedMessage("ar", 'INVALID_TOKEN'));

        try {
            await verifyAccessToken(token);
            const decodedPayload = getUserPayloadFromAccessToken(token) as any;
            req.user = await userRepository.getById(decodedPayload.id);
            next();
        } catch (error: any) {
            logger.error(auth.name, error.message);
            next(error);
        }
    } catch (error: any) {
        logger.error(auth.name, error.message);
        next(error);
    }
}

export default auth;