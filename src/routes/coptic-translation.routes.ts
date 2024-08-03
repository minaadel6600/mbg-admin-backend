import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller"; 
import dataValidator from "../middlewares/validate-data.middleware";
import LoginDtoSchema from "../dtos/login.dto";
import { role } from "../models/user.model";
import AuthorizeRole from "../middlewares/role-authorize"; 
import auth from "../middlewares/auth.middleware";
import upload from "../middlewares/upload-file";
import CopticTranslationController from "../controllers/coptic-translation.controller";

let copticTranslationController = new CopticTranslationController();
const router: Router = Router();

router.post('/words/page', copticTranslationController.getPage);
router.get('/words', copticTranslationController.getAllWords); 
//router.get('/:id',auth,AuthorizeRole([role.admin,role.agent]), copticTranslationController.getBookById);
router.get('/:id', copticTranslationController.getWordById);
router.post('/word', copticTranslationController.addWord);
router.post('/upload',upload.single('img'), copticTranslationController.uploadWord);
router.put('/word/:id',dataValidator(LoginDtoSchema), copticTranslationController.updateWord);
router.delete('/:id', copticTranslationController.deleteWordById);



export const translationRoutes: Router = router;
