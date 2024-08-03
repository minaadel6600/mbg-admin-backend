import { Request } from 'express';
import DecodedUser from './i-decoded-user';
import { IUser, role } from '../models/user.model';


export default interface IRequest extends Request {


    user?: IUser;
    lang?: string;
    file?: any;
}
