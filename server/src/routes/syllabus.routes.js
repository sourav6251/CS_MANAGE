import express from "express";
import syllabusController from "../controller/syllabus.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import syllabusValidation from "../validations/syllabus.validation.js";

const router = express.Router();

router
    .post('/',validate(syllabusValidation.create), syllabusController.createSyllabus)
    .get('/', syllabusController.showSyllabus)
    .patch('/:syllabusId',validate(syllabusValidation.update), syllabusController.updateSyllabus)
    .delete('/:syllabusId',validate(syllabusValidation.delete), syllabusController.deleteSyllabus)


export const syllabusRouter = router;