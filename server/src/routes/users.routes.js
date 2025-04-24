import express from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import userValidations from "../validations/users.validations.js";
import userController from "../controller/users.controller.js";

const router = express.Router();

router
    .post('/',validate(userValidations.create), userController.createUser)
    .get('/',validate(userValidations.show), userController.getUser)
    .patch('/:userId',validate(userValidations.update), userController.updateUser)
    .delete('/:userId',validate(userValidations.delete), userController.deleteUser)
    .delete('/generateotp/:userId',validate(userValidations.generateOTP), userController.generateOTP)
    .delete('/verifyotp',validate(userValidations.verifyOTP), userController.verifyOTP)
   
   
export const usersRouter = router;
 