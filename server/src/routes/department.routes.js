import express from "express";
// import { validate } from "../middlewares/validate.middleware.js";
import departmentController from "../controller/department.controller.js";
import departmentValidation from "../validations/department.validation.js";
import { validate } from "../middlewares/validate.middlewares.js";
// import departmentController from "../controller/department.controller.js";
// import departmentValidation from "../validations/department.validation.js";

const router = express.Router();

router
    .post('/', validate(departmentValidation.create), departmentController.createDepartment)
    .get('/', departmentController.showDepartment) 
    .get('/:departmentId', departmentController.showDepartment)
    .patch('/:departmentId', validate(departmentValidation.update), departmentController.updateDepartment)
    .delete('/:departmentId', validate(departmentValidation.delete), departmentController.deleteDepartment);

export const departmentRouter = router;
