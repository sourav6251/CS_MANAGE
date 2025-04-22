import syllabusService from "../services/syllabus.service.js";
import { sendResponse } from "../utils/response.handler.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";

class SyllabusController {
    async createSyllabus(req, res) {
        try {
            const syllabus = await syllabusService.createSyllabus(req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.SYLLABUS_CREATED,
                success: true,
                data: syllabus, 
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error
            });
        }
    }

    async updateSyllabus(req, res) {
        try {
            const syllabus = await syllabusService.updateSyllabus(req.body, req.params.syllabusId);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.SYLLABUS_UPDATED,
                success: true,
                data: syllabus,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error
            });
        }
    }

    async showSyllabus(req, res) {
        try {
            const syllabus = await syllabusService.showSyllabus(req.body);
            console.log(`syllabus => ${syllabus} `);


            if (syllabus) {
                return sendResponse(res, {
                    status: HTTP_STATUS.OK,
                    message: RESPONSE_MESSAGES.SYLLABUS_UPDATED,
                    success: true,
                    data: syllabus,
                });

            }

            return sendResponse(res, {
                status: HTTP_STATUS.NO_CONTENT,
                message: RESPONSE_MESSAGES.SYLLABUS_UPDATED,
                success: true,
                data: syllabus,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error
            });
        }
    }

    async deleteSyllabus(req, res) {
        try {
            const syllabus = await syllabusService.deleteSyllabus(req.params.syllabusId);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.SYLLABUS_DELETE,
                success: true,
                data: syllabus,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error
            });
        }
    }
}
export default new SyllabusController();

// base path : api/v1/syllebus

//        1. create - (post method)
//          - authenticate
//          - only hod can create syllebus
//          - payload : {
//               - userId ,
//               - deparmantalId ,
//               - semId ,
//               - paperCode
//               - paperName
//               - media
//            }

//       2. update - (patch method)
//          - authenticate
//          - only hod can update syllebus
//          - payload :
//             body : {
//               - userId ,
//               - deparmantalId ,
//               - semId ,
//               - paperCode
//               - paperName
//               - media
//            }
//            params : { syllebusId }

//       3. delete - (delete method)
//          - authenticate
//          - only hod can delete syllebus
//          - payload : param : { syllebusId }