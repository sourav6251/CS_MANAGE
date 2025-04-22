import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import semesterController from "../controller/semester.controller.js";
import semesterValidation from "../validations/semester.validation.js";

const router = express.Router();

router
    .post('/', validate(semesterValidation.create), semesterController.createSemester)
    .get('/one/:semesterId', semesterController.showSemester)
    .get('/:departmentId', semesterController.showAllSemester)
    .patch('/:semesterId', validate(semesterValidation.update), semesterController.updateSemester)
    .delete('/:semesterId', validate(semesterValidation.delete), semesterController.deleteSemester);

export const semesterRouter = router;
