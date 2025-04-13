import express from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import certificateValidation from "../validations/certificate.validation.js";
import certificateController from "../controller/certificate.controller.js";
// import certificateController from "../controller/certificate.controller.js";

const router = express.Router();

router
    .post('/', validate(certificateValidation.create), certificateController.createCertificate)
    .get('/', validate(certificateValidation.show), certificateController.showCertificates)
    .patch('/:certificateId', validate(certificateValidation.update), certificateController.updateCertificate)
    .delete('/:certificateId', validate(certificateValidation.delete), certificateController.deleteCertificate);

export const certificateRouter = router;
