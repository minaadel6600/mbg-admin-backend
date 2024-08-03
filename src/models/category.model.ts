import { func, object } from 'joi';
import * as mongoose from 'mongoose';

export interface ICategory {
  _id: string;
  Name?: string;
  Type?: string;
}

const categorySchema = new mongoose.Schema(
  {
    Name: String,
    Type: String
  },
  {timestamps: true}
);


categorySchema.methods.toJSON = function () {
  const category = this;
  const userObj = category.toObject();

  return userObj;
}


const categoryModel = mongoose.model<ICategory & mongoose.Document>('Category', categorySchema);

export default categoryModel;
