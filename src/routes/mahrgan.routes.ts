import { Router } from "express"; 
import { role } from "../models/user.model";
import AuthorizeRole from "../middlewares/role-authorize"; 
import auth from "../middlewares/auth.middleware";
import MahrganBookController from "../controllers/mahrgan.controller";
import upload from "../middlewares/upload-file";

let mahrganBooksController = new MahrganBookController();
const router: Router = Router();




router.post('/page', mahrganBooksController.getPage);
router.get('/', mahrganBooksController.getAllBooks);
router.get('/categories', mahrganBooksController.getBookCategories);
//router.get('/:id',auth,AuthorizeRole([role.admin,role.agent]), mahrganBooksController.getBookById);
router.get('/:id', mahrganBooksController.getBookById);
router.post('/', mahrganBooksController.addBook);
router.post('/upload',upload.single('img'), mahrganBooksController.uploadBook);
router.put('/:id', mahrganBooksController.updateBook);
router.delete('/:id', mahrganBooksController.deleteBookById);



 
export const mahrganBookRoutes: Router = router;
