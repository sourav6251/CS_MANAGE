import { sendResponse } from "../utils/response.handler.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import routineService from "../services/routine.service.js";

class RoutineController {
    // Create a new routine
    async createRoutine(req, res) {
        try {
            const routine = await routineService.createRoutine(req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.ROUTINE_CREATED,
                success: true,
                data: routine,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error,
            });
        }
    }

    // Update an existing routine
    async updateRoutine(req, res) {
        try {
            const routine = await routineService.updateRoutine(
                req.params.routineId,
                req.body
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.ROUTINE_UPDATED,
                success: true,
                data: routine,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error,
            });
        }
    }

    // Show all routines with optional filters
    async showRoutine(req, res) {
        try {
            const routines = await routineService.showRoutines(req.query);

            if (routines && routines.length > 0) {
                return sendResponse(res, {
                    status: HTTP_STATUS.OK,
                    message: RESPONSE_MESSAGES.ROUTINE_GET,
                    success: true,
                    data: routines,
                });
            }

            return sendResponse(res, {
                status: HTTP_STATUS.NO_CONTENT,
                message: RESPONSE_MESSAGES.NO_ROUTINE,
                success: true,
                data: [],
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error,
            });
        }
    }

    // Delete a routine
    async deleteRoutine(req, res) {
        try {
            const routine = await routineService.deleteRoutine(req.params.routineId);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.ROUTINE_DELETE,
                success: true,
                data: routine,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error,
            });
        }
    }
}

export default new RoutineController();
