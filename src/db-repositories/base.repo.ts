import mongoose, { Model } from "mongoose";
import userModel, { IUser } from "../models/user.model";

export class GenericRepository<T> {
  public _model: any;

  constructor(model: any) {
    this._model = model;
  }

  public async getAll(): Promise<T[]> {
    return await this._model.find();
  }
  public async getCount(searchQuery:Object={}): Promise<number> {
    return await this._model.countDocuments(searchQuery);
  }
  public async getPage(currentPage:number , pageSize:number,searchQuery:Object,sortQuery:Object,selectedFields:string=''): Promise<T[]> {
    return await this._model.find(searchQuery).select(selectedFields).sort(sortQuery).skip((currentPage)*pageSize).limit(pageSize);
  }
  public async getById(id: string): Promise<T> {
    return await this._model.findById(id);
  }
  public async getOne(filter: Object): Promise<T> {
    return await this._model.findOne(filter);
  }
  public async search(filter: Object): Promise<T[]> {
    return await this._model.find(filter);
  }
  public async Create(item: T) {
    return await this._model.create(item);
  }
  public async UpdateById(id: string, data: T) {
    return await this._model.findByIdAndUpdate(id, data ,{new: true});
  }
  public async DeleteById(id: string) {
    return await this._model.findByIdAndDelete(id);
  }
  public async GetSum(field:String) {
    return await this._model.aggregate([{$group: {_id:"null", total:{$sum:"$"+field}}}])
  }
}

export default GenericRepository;
