import { sendResponse } from "../utils/response.handler.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import certificateService from "../services/certificate.service.js";

class CertificateController {
    // Create a certificate
    async createCertificate(req, res) {
        try {
            const certificate = await certificateService.createCertificate(req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.CERTIFICATE_CREATED,
                success: true,
                data: certificate,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }

    // Update a certificate
    async updateCertificate(req, res) {
        try {
            const certificate = await certificateService.updateCertificate(
                req.params.certificateId,
                req.body
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.CERTIFICATE_UPDATED,
                success: true,
                data: certificate,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }

    // Show all certificates (with optional filters)
    async showCertificates(req, res) {
        try {
            const certificates = await certificateService.showCertificates(req.query);

            if (certificates && certificates.length > 0) {
                return sendResponse(res, {
                    status: HTTP_STATUS.OK,
                    message: RESPONSE_MESSAGES.CERTIFICATE_GET,
                    success: true,
                    data: certificates,
                });
            }

            return sendResponse(res, {
                status: HTTP_STATUS.NO_CONTENT,
                message: RESPONSE_MESSAGES.NO_CERTIFICATE,
                success: true,
                data: certificates,
            });
        } catch (error) {
            console.log(error);
            
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }

    // Delete  certificate
    async deleteCertificate(req, res) {
        try {
            const certificate = await certificateService.deleteCertificate(req.params.certificateId);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.CERTIFICATE_DELETE,
                success: true,
                data: certificate,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }

    test(req,res){
        return sendResponse(res, {
            status: HTTP_STATUS.OK,
            message: RESPONSE_MESSAGES.CERTIFICATE_DELETE,
            success: true,
        });
    }
}

export default new CertificateController();
