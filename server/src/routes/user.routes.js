import express from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import userValidations from "../validations/user.validations.js";
import userController from "../controller/user.controller.js";

const router = express.Router();

router
    .post('/',validate(userValidations.create), userController.createUser)
    .get('/',validate(userValidations.show), userController.getUser)
    .patch('/:userId',validate(userValidations.update), userController.updateUser)
    .delete('/:userId',validate(userValidations.delete), userController.deleteUser)
   
   
export const userRouter = router;
