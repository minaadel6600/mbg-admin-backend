import copticTranslationModel, { ICopticTranslation } from "../models/coptic-word.model";
import mahrganModel from "../models/mahrgan.model";
import GenericRepository from "./base.repo";


export class CopticTranslationRepository extends GenericRepository<ICopticTranslation>{

    constructor() {
        super(copticTranslationModel);   
    }

 
}