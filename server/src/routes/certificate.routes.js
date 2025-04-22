import express from "express";
import certificateValidation from "../validations/certificate.validation.js";
import certificateController from "../controller/certificate.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router
    .post('/', validate(certificateValidation.create), certificateController.createCertificate)
    .get('/', certificateController.showCertificates)
    .get('/test',  certificateController.test)
    .patch('/:certificateId', validate(certificateValidation.update), certificateController.updateCertificate)
    .delete('/:certificateId', validate(certificateValidation.delete), certificateController.deleteCertificate);

export const certificateRouter = router;
