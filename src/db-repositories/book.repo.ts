import bookModel, { IBook } from "../models/book.model"; 
import GenericRepository from "./base.repo";


export class BookRepository extends GenericRepository<IBook>{

    constructor() {
        super(bookModel);
        
    }

 
}