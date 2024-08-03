import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller"; 
import dataValidator from "../middlewares/validate-data.middleware";
import LoginDtoSchema from "../dtos/login.dto";
import { role } from "../models/user.model";
import AuthorizeRole from "../middlewares/role-authorize";
import BooksController from "../controllers/books.controller";
import auth from "../middlewares/auth.middleware";
import upload from "../middlewares/upload-file";
import StatisticsController from "../controllers/statistics.controller";

let statisticsController = new StatisticsController();
const router: Router = Router();

router.get('/home', statisticsController.getHomeStats); 



export const statisticsRoutes: Router = router;
