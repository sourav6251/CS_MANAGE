import express from "express";
// import routineController from "../controller/routine.controller.js";
import { validate } from "../middlewares/validate.middlewares.js";
import routineValidations from "../validations/routine.validations.js";
import routineController from "../controller/routine.controller.js";

const router = express.Router();

router
    .post("/",validate(routineValidations.create),routineController.createRoutine)
    .get("/", validate(routineValidations.show), routineController.showRoutine)
    .patch("/:routineId",validate(routineValidations.update),routineController.updateRoutine)
    .delete("/:routineId",validate(routineValidations.delete),routineController.deleteRoutine);

export const routineRouter = router;
