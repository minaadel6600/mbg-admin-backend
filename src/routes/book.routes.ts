import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller"; 
import dataValidator from "../middlewares/validate-data.middleware";
import LoginDtoSchema from "../dtos/login.dto";
import { role } from "../models/user.model";
import AuthorizeRole from "../middlewares/role-authorize";
import BooksController from "../controllers/books.controller";
import auth from "../middlewares/auth.middleware";
import upload from "../middlewares/upload-file";

let booksController = new BooksController();
const router: Router = Router();

router.post('/page', booksController.getPage);
router.get('/', booksController.getAllBooks);
router.get('/categories', booksController.getBookCategories);
//router.get('/:id',auth,AuthorizeRole([role.admin,role.agent]), booksController.getBookById);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.addBook);
router.post('/upload',upload.single('img'), booksController.uploadBook);
router.put('/:id',dataValidator(LoginDtoSchema), booksController.updateBook);
router.delete('/:id', booksController.deleteBookById);



export const bookRoutes: Router = router;
