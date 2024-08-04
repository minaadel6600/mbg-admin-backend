import { Router } from "express";
import dataValidator from "../middlewares/validate-data.middleware";
import { role } from "../models/user.model";
import AuthorizeRole from "../middlewares/role-authorize";
import UsersController from "../controllers/user.controller";
import auth from "../middlewares/auth.middleware";
import UpdateUserDtoSchema from "../dtos/update-user.dto";

let usersController = new UsersController();
const router: Router = Router();

router.get('/', auth, AuthorizeRole([role.admin, role.khadem]), usersController.getKhademUsers);
router.get('/car-users', auth, AuthorizeRole([role.admin, role.car_visitor]), usersController.getCarVisitorUsers);

router.get('/:id', auth, AuthorizeRole([role.khadem, role.car_visitor, role.khadem]), usersController.getUserById);

router.post('/', usersController.addUser);
router.put('/:id', dataValidator(UpdateUserDtoSchema), usersController.updateUser);
router.delete('/:id', usersController.deleteUserById);


export const UsersRoutes: Router = router;
