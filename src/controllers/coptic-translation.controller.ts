import { Response, NextFunction } from "express";
import { resSuccess } from "../utils/response.helper";
import IRequest from "../interfaces/i-request";
import { getTranslatedMessage } from "../utils/locales/translate-helpers";
import CopticTranslationService from "../services/coptic-translation.service";
import SharedServices from "../services/shared.services";
import path from "path";
import AWS from "aws-sdk";
import { S3_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET, IMG_BASE_URL } from "../globals/constants";

class CopticTranslationController {
  private copticTranslationService = new CopticTranslationService();
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
      const words = await this.copticTranslationService.getPageOfWords(currentPage, pageSize, searchKey);
      const wordsCount = await this.copticTranslationService.getWordsCount();
      resSuccess(req, res, 200, "", { words, count: wordsCount });
    } catch (error) {
      next(error);
    }
  };
  public getAllWords = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const words = await this.copticTranslationService.getAllWordsService();
      resSuccess(req, res, 200, "", { words });
    } catch (error) {
      next(error);
    }
  };
  public getWordById = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const wordId = req.params.id;
      let word = await this.copticTranslationService.getWordByIdService(req, wordId);

      resSuccess(req, res, 200, "", { word });
    } catch (error) {
      next(error);
    }
  };
  public deleteWordById = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const wordId = req.params.id;
      const word = await this.copticTranslationService.deleteWordByIdService(req, wordId);
      resSuccess(req, res, 200, getTranslatedMessage("ar", "BOOK_DELETE_SUCCESS"), { word });
    } catch (error) {
      next(error);
    }
  };
  public addWord = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const wordData = req.body;
      const updatedWord = await this.copticTranslationService.addWordService(wordData);
      resSuccess(req, res, 200, getTranslatedMessage("ar", "BOOK_ADD_SUCCESS"), { updatedWord });
    } catch (error) {
      next(error);
    }
  };

  public uploadWord = async (req: IRequest, res: Response, next: NextFunction) => {
    try {

      if (req.file) {
        // format file name
        var extension = path.extname(req.file.originalname);
        var file_name = 'images' + '/' + 'word_' + new Date().getTime() + extension;

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
  public updateWord = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const wordId = req.params.id;
      const wordData = req.body;
      const updatedWord = await this.copticTranslationService.updateWordService(req, wordId, wordData);

      resSuccess(req, res, 200, "word updated successfully", { updatedWord });
    } catch (error) {
      next(error);
    }
  };


}

export default CopticTranslationController;
