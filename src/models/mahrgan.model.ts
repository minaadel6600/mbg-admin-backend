import { number } from 'joi';
import * as mongoose from 'mongoose';
import { IMG_BASE_URL } from '../globals/constants';

export interface IMahrgan {
  _id?: string;
  Title?: string,
  ShortExplnation?: string,
  PhaseID?: number,
  Size?: number,
  Image?: string,
  DownloadURLdirct?: string;
  DownloadURLMediaFire?: string;
  DownloadURLDrive?: string;
  DownloadURLOther?: string;
  YearOfPrint?: string;
  DownloadsCount?: number;
  NumberOfViews?: number;
  IsDeleted?: boolean;
  CreationDate?: Date;
  CreatedBy?: number;
  ModifiedBy?: number;
  ModifiecationDate?: Date;

}


const mahrganSchema = new mongoose.Schema(
  {

    Title: String,
    ShortExplnation: String,
    PhaseID: Number,
    Size: Number,
    Image: String,
    DownloadURLdirct: String,
    DownloadURLMediaFire: String,
    DownloadURLDrive: String,
    DownloadURLOther: String,
    YearOfPrint: String,
    DownloadsCount: {
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
    CreatedBy: String,
    ModifiedBy: String,
    ModifiecationDate: Date,

  },
  { timestamps: true }
);






mahrganSchema.methods.toJSON = function () {
  const mahrgan = this;
  let mahrganObj = mahrgan.toObject();
  mahrganObj.Image = IMG_BASE_URL + '/images/mahrgan/' + mahrganObj.Image;
  if (mahrganObj) {
    delete mahrganObj.__v;
  }
  return mahrganObj;
}


const mahrganModel = mongoose.model<IMahrgan & mongoose.Document>('Mahrgan', mahrganSchema);

export default mahrganModel;
