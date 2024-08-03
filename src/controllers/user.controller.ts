import { Response, NextFunction } from "express";
import { resSuccess } from "../utils/response.helper";
import IRequest from "../interfaces/i-request";
import UserService from "../services/user.service";
import { getTranslatedMessage } from "../utils/locales/translate-helpers";
import SharedServices from "../services/shared.services";

// import entire SDK
import AWS from 'aws-sdk';
import path from 'path';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, IMG_BASE_URL, S3_BUCKET, S3_REGION } from "../globals/constants";

class UsersController {
  private userService = new UserService();
  private sharedServices = new SharedServices();

  public getKhademUsers = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let pageSize: any = req.body.size;
      let currentPage: any = req.body.current;
      let searchKey: any = req.body.key;
      const { users, count } = await this.userService.getKhademUsers(currentPage, pageSize, searchKey, req.user?._id);
      resSuccess(req, res, 200, "", { users, count });
    } catch (error) {
      next(error);
    }
  };
  public getCarVisitorUsers = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let pageSize: any = req.body.size;
      let currentPage: any = req.body.current;
      let searchKey: any = req.body.key;
      const { users, count } = await this.userService.getCarVisitorUsers(currentPage, pageSize, searchKey, req.user?._id);
      resSuccess(req, res, 200, "", { users, count });
    } catch (error) {
      next(error);
    }
  };
  public getUserById = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      let user = await this.userService.getUserByIdService(req, userId);

      resSuccess(req, res, 200, "", { user });
    } catch (error) {
      next(error);
    }
  };
  public deleteUserById = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.deleteUserByIdService(req, userId);
      resSuccess(req, res, 200, getTranslatedMessage("ar", "BOOK_DELETE_SUCCESS"), { user });
    } catch (error) {
      next(error);
    }
  };
  public addUser = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const updatedUser = await this.userService.addUserService(userData);
      resSuccess(req, res, 200, getTranslatedMessage("ar", "BOOK_ADD_SUCCESS"), { updatedUser });
    } catch (error) {
      next(error);
    }
  };

  public uploadUser = async (req: IRequest, res: Response, next: NextFunction) => {
    try {

      if (req.file) {
        // format file name
        var extension = path.extname(req.file.originalname);
        var file_name = 'images' + '/' + 'user_' + new Date().getTime() + extension;

        // Set the region and access keys
        AWS.config.update({
          region: S3_REGION,
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
        });

        // Cr9eate a new instance of the S3 class
        const s3 = new AWS.S3();

        // Set the parameters for the file you want to upload
        const params: any = {
          Bucket: S3_BUCKET,
          Key: file_name,
          Body: req.file.buffer,
          ContentType: req.file.mimetype
        };


        // Upload the file to S3
        s3.upload(params, (err: any, data: any) => {
          if (err) {
            res.status(400).json({ 'Error uploading file:': err.message });
          } else {
            console.log('File uploaded successfully. File location:', data.Key);
            const imgPath = data.Key;

            resSuccess(req, res, 200, getTranslatedMessage("ar", "UPLOAD_SUCCESS"), { imgUrl: IMG_BASE_URL + '/' + imgPath });

          }
        });


      }
    } catch (err) {
      next(err)
    }
  };
  public updateUser = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const updatedUser = await this.userService.updateUserService(req, userId, userData);

      resSuccess(req, res, 200, "user updated successfully", { updatedUser });
    } catch (error) {
      next(error);
    }
  };

  public getUserCategories = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const categories = await this.sharedServices.getCategories("users");
      resSuccess(req, res, 200, "", { categories });

    } catch (error) {
      next(error);

    }
  }
}

export default UsersController;
