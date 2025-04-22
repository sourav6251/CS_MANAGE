import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import semesterService from "../services/semester.service.js";
import { sendResponse } from "../utils/response.handler.js";

class SemesterController {
    // Create a Semester
    async createSemester(req, res) {
        try {
            const semester = await semesterService.createSemester(req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.SEMESTER_CREATED,
                success: true,
                data: semester,
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

    // Update a Semester
    async updateSemester(req, res) {
        try {
            const semester = await semesterService.updateSemester(
                req.params.semesterId,
                req.body
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.SEMESTER_UPDATED,
                success: true,
                data: semester,
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

    // Show one Semester
    async showSemester(req, res) {
        try {
            console.log(req.params.semesterId);
            
            const semester = await semesterService.showSemester(req.params.semesterId);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.SEMESTER_GET,
                success: true,
                data: semester,
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

    async showAllSemester(req, res) {
        try {
            const semester = await semesterService.showSemesterByDepartmentId(req.params.departmentId);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.SEMESTER_GET,
                success: true,
                data: semester,
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
    // Delete  Semester
    async deleteSemester(req, res) {
        try {
            const Semester = await semesterService.deleteSemester(
                req.params.semesterId
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.SEMESTER_DELETE,
                success: true,
                data: Semester,
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
}


export default new SemesterController();