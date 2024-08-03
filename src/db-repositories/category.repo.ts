import categoryModel, { ICategory } from "../models/category.model";
import GenericRepository from "./base.repo";


export class CategoryRepository extends GenericRepository<ICategory>{

    constructor() {
        super(categoryModel);
        
    }

 
}