import { number } from 'joi';
import * as mongoose from 'mongoose';
import { IMG_BASE_URL } from '../globals/constants';

export interface ICopticTranslation {
  _id?: string;
  Arabic?: String,
  English?: String,
  Coptic?: String,
  ArabicCoptic?: String,
  EnglishPronounce: String,
  Examples?: [String],
  SoundURL?: String

}


const copticTranslationSchema = new mongoose.Schema(
  {
    Arabic: {
      type: String
    },
    English: {
      type: String,
    },
    Coptic: {
      type: String
    },
    ArabicCoptic: String,
    EnglishPronounce: String,
    Examples: [String],
    SoundURL: {
      type: String
    }

  },
  { timestamps: true }
);



copticTranslationSchema.methods.toJSON = function () {
  const copticTranslation = this;
  let copticTranslationObj = copticTranslation.toObject();
  if (copticTranslationObj) {
    delete copticTranslationObj.__v;
  }
  return copticTranslationObj;
}


const copticTranslationModel = mongoose.model<ICopticTranslation & mongoose.Document>('CopticTranslation', copticTranslationSchema);

export default copticTranslationModel;
