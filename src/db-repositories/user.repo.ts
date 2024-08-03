import  userModel, { IUser } from "../models/user.model";
import GenericRepository from "./base.repo";


export class UserRepository extends GenericRepository<IUser>{

    constructor() {
        super(userModel);
        
    }

    // public async getById(id: string): Promise<IUser>  {
        
    //   return await  this._model.find().populate("user",'-password')
    // }
}