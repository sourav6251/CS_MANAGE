import express from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import noticeboardValidation from "../validations/noticeboard.validation.js";
import noticeController from "../controller/notice.controller.js";

const router = express.Router();

router
    .post('/', validate(noticeboardValidation.create), noticeController.createNotice)
    .get('/', validate(noticeboardValidation.show), noticeController.showNotices)
    .patch('/:noticeId', validate(noticeboardValidation.update), noticeController.updateNotice)
    .delete('/:noticeId', validate(noticeboardValidation.delete), noticeController.deleteNotice);

export const noticeboardRouter = router;
