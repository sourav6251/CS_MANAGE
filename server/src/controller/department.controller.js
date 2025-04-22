import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import departmentService from "../services/department.service.js";
import { sendResponse } from "../utils/response.handler.js";

class DepartmentController {
    async createDepartment(req, res) {
        try {
            const department = await departmentService.createDepartment(
                req.body
            );

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.DEPARTMENT_CREATED,
                success: true,
                data: department,
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

    async updateDepartment(req, res) {
        try {
            const department = await departmentService.updateDepartment(
                req.params.departmentId,
                req.body
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.DEPARTMENT_UPDATED,
                success: true,
                data: department,
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

    async showDepartment(req, res) {
        try {
            const departmentId = req.params.departmentId;
            let department;
            if (departmentId) {
                department = await departmentService.showDepartment(
                    departmentId
                );
            } else {
                department = await departmentService.showDepartment();
            }

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.DEPARTMENT_GET,
                success: true,
                data: department,
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

    async deleteDepartment(req, res) {
        try {
            const department = await departmentService.deleteDepartment(
                req.params.departmentId
            );
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.DEPARTMENT_DELETE,
                success: true,
                data: department,
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

export default new DepartmentController();
