import { number } from 'joi';
import * as mongoose from 'mongoose';
import { IMG_BASE_URL } from '../globals/constants';

export interface IBook {
  _id?: string;
  Title?: string;
  Description?: string;
  Image?: string;
  Catagory?: [string];
  RatingAverge?: number;
  Ratings?: {};
  DownloadURLdirct?: string;
  DownloadURLMediaFire?: string;
  DownloadURLDrive?: string;
  DownloadURLOther?: string;
  YearOfPrint?: string;
  DownloadsCount?: number;
  NumberOfViews?: number;
  IsDeleted?: boolean;
  CreationDate?: Date;
  CreatedBy?: String;
  ModifiedBy?: String;
  ModifiecationDate?: Date;

}

const ratingSchema = new mongoose.Schema({
  User: {
    _id: String,
    type: String
  },
  Value: {
    type: Number,
    min: 1,
    max: 5

  }
});

export enum role {
  admin = 'admin', agent = 'agent', end_user = 'end_user'
}

const bookSchema = new mongoose.Schema(
  {

    Title: String,
    Description: String,
    Author: String,
    Size: Number,
    Image: String,
    Category: [String],
    Catagory: [String],
    RatingAverge: {
      type: Number,
      default: 1
    },
    Ratings: [ratingSchema],
    DownloadURLdirct: String,
    DownloadURLMediaFire: String,
    DownloadURLDrive: String,
    DownloadURLOther: String,
    YearOfPrint: String,
    DownloadsCount: {
      type: Number,
      default: 1
    },
    NumberOfRatings: {
      type: Number,
      default: 1
    },
    NumberOfViews: {
      type: Number,
      default: 1
    },
    IsDeleted: {
      type: Boolean,
      default: false
    },
    KeyWords: String,
    CreationDate: Date,
    CreatedBy: Date,
    ModifiedBy: Date,
    ModifiecationDate: Date,

  },
  { timestamps: true }
);






bookSchema.methods.toJSON = function () {
  const book = this;
  let bookObj = book.toObject();
  bookObj.Image = IMG_BASE_URL + '/images/' + bookObj.Image;
  if (bookObj) {
    delete bookObj.__v;
  }
  return bookObj;
}


const bookModel = mongoose.model<IBook & mongoose.Document>('Book', bookSchema);

export default bookModel;
