import mahrganModel, { IMahrgan } from "../models/mahrgan.model";
import GenericRepository from "./base.repo";


export class MahrganRepository extends GenericRepository<IMahrgan>{

    constructor() {
        super(mahrganModel);
        
    }

 
}