import { Response, NextFunction } from "express";
import { resSuccess } from "../utils/response.helper";
import IRequest from "../interfaces/i-request";
import BookService from "../services/book.service";
import { getTranslatedMessage } from "../utils/locales/translate-helpers";
import SharedServices from "../services/shared.services";
// import entire SDK
import AWS from 'aws-sdk';
import path from 'path';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, IMG_BASE_URL, S3_BUCKET, S3_REGION } from "../globals/constants";
import { number } from "joi";
import MahrganService from "../services/mahrgan.service";

class MahrganController {

  private mahrganService = new MahrganService();
  private sharedServices = new SharedServices();

  public getPage = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let pageSize: any = req.body.size;
      let currentPage: any = req.body.current;
      let searchKey: any = req.body.key;
      const books = await this.mahrganService.getPageOfBooks(currentPage, pageSize, searchKey);
      const booksCount = await this.mahrganService.getBooksCount();
      resSuccess(req, res, 200, "", { books, count: booksCount });
    } catch (error) {
      next(error);
    }
  };
  public getAllBooks = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const books = await this.mahrganService.getAllBooksService();
      resSuccess(req, res, 200, "", { books });
    } catch (error) {
      next(error);
    }
  };
  public getBookById = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookId = req.params.id;
      let book = await this.mahrganService.getBookByIdService(req, bookId);

      resSuccess(req, res, 200, "", { book });
    } catch (error) {
      next(error);
    }
  };
  public deleteBookById = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookId = req.params.id;
      const book = await this.mahrganService.deleteBookByIdService(req, bookId);
      resSuccess(req, res, 200, getTranslatedMessage("ar", "BOOK_DELETE_SUCCESS"), { book });
    } catch (error) {
      next(error);
    }
  };
  public addBook = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const bookData = req.body;
      const updatedBook = await this.mahrganService.addBookService(bookData);
      resSuccess(req, res, 200, getTranslatedMessage("ar", "BOOK_ADD_SUCCESS"), { updatedBook });
    } catch (error) {
      next(error);
    }
  };

  public uploadBook = async (req: IRequest, res: Response, next: NextFunction) => {
    try {

      if (req.file) {
        // format file name
        var extension = path.extname(req.file.originalname);
        var file_name = 'images' + '/' + 'book_' + new Date().getTime() + extension;

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
  public updateBook = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.id;
      const bookData = req.body;
      const updatedBook = await this.mahrganService.updateBookService(req, bookId, bookData);

      resSuccess(req, res, 200, "book updated successfully", { updatedBook });
    } catch (error) {
      next(error);
    }
  };

  public getBookCategories = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const categories = await this.sharedServices.getCategories("books");
      resSuccess(req, res, 200, "", { categories });

    } catch (error) {
      next(error);

    }
  }
}



export default MahrganController;
