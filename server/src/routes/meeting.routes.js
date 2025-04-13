import express from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import meetingValidation from "../validations/meeting.validation.js";
import meetingController from "../controller/meeting.controller.js";

const router = express.Router();

router
    .post('/',validate(meetingValidation.create), meetingController.createMeeting)
    .get('/',validate(meetingValidation.show), meetingController.showMeeting)
    .patch('/:meetingId',validate(meetingValidation.update), meetingController.updateMeeting)
    .delete('/:meetingId',validate(meetingValidation.delete), meetingController.deleteMeeting)


export const meetingRouter = router;