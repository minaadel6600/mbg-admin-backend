import { ref, string } from 'joi';
import * as mongoose from 'mongoose';


export enum role {
  admin = 'admin', khadem = 'khadem', car_visitor = 'car_visitor', end_user = 'end_user'
}
export enum marital_status_enum {
  single = 'single', married = 'married'
}
export enum wife_status {
  no_visa = 'no_visa', visit_visa = 'visit_visa', future_iqama = 'future_iqama'
}
export enum user_status {
  in_riyadh = 'in_riyadh', visit_visa = 'in_egypt_temp', out_of_riyadh = 'out_of_riyadh', left_to_egypt = 'left_to_egypt'
}

export interface IUser {
  _id?: string;
  name?: string;
  image?: string;
  email?: string;
  mobile?: string;
  egyMobile?: string;
  whatsapp?: string;
  password?: string;
  area?: string;
  addressDetails?: string;
  locationOnGoogleMap?: string;
  wifeStatus?: string;
  khadem?: string
  hasCar?: boolean,
  carVisitor?: string,
  status?: user_status;
  notes?:string;
  roles?: [role];
}


const userSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    email: String,
    mobile: String,
    egyMobile: String,
    whatsapp: String,
    refreshToken: String,
    password: String,
    addressDetails: String,
    locationURL: String,
    maritalStatus: { type: String, enum: marital_status_enum },
    wifeStatus: { type: String, enum: wife_status, default: 'no_visa' },
    khedmaBefore: String,
    locationOnGoogleMap: String,
    khadem: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hasCar: Boolean,
    carVisitor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: user_status, default: 'in_riyadh' },
    roles: [{ type: String, enum: role, default: 'end_user' }]


  },
  { timestamps: true }
);


userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  if (userObj) {
    delete userObj.password;
    delete userObj.__v;

  }
  return userObj;
}


const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);

export default userModel;
