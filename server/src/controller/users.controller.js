import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { sendMail } from "../services/sendmail.service.js";
import userService from "../services/user.service.js";
import { sendResponse } from "../utils/response.handler.js";

class UsersController {
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.USER_CREATED,
                success: true,
                data: user,
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

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(
                req.body,
                req.params.userId
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.USER_UPDATED,
                success: true,
                data: user,
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

    async deleteUser(req, res) {
        try {
            const user = await userService.deleteUser(req.params.userId);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.USER_DELETE,
                success: true,
                data: user,
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
 
    async getUser(req, res) {
        try {
            const user = await userService.getUserById(req.body);
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.USER_GET,
                success: true,
                data: user,
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

    async generateOTP(req, res) {
        try {
            const { userId } = req.params;

            const result = await userService.generateOTP(userId);
            try {
                await sendMail(result.email, "Verify OTP", result.otp);
                return sendResponse(res, {
                    status: HTTP_STATUS.OK,
                    message: RESPONSE_MESSAGES.OTP_SUCCESS,
                    success: true,
                    // includes { otp } – you can remove this in production for security
                });
            } catch (error) {
                return sendResponse(res, {
                    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    message: RESPONSE_MESSAGES.MAIL_ERROR,
                    success: true,
                    // includes { otp } – you can remove this in production for security
                });
            }
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.NOT_FOUND,
                message: RESPONSE_MESSAGES.USER_NOT_FOUND,
                success: false,
                error: error.message,
            });
        }
    }

    async verifyOTP(req, res) {
        try {
            const { userId, otp } = req.body;

            const result = await userService.verifyOTP({ userId, otp });

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.OTP_VERIFIED,
                success: true,
                data: result,
            });
        } catch (error) {
            let status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
            let message = RESPONSE_MESSAGES.INTERNAL_ERROR;

            // 💡 Customize based on known error types
            if (
                error.message === "User not found" ||
                error.message === "No OTP has been set"
            ) {
                status = HTTP_STATUS.NOT_FOUND;
                message = error.message;
            } else if (
                error.message === "OTP has expired" ||
                error.message === "Invalid OTP"
            ) {
                status = HTTP_STATUS.BAD_REQUEST;
                message = error.message;
            }

            return sendResponse(res, {
                status,
                message,
                success: false,
                error: error.message,
            });
        }
    }

    // async getUserByDepartment(req, res) {
    //     try {
    //         const user = await userService.getUserByDepartment(req.params.department);
    //         return sendResponse(res, {
    //             status: HTTP_STATUS.OK,
    //             message: RESPONSE_MESSAGES.USER_BY_DEPARTMENT,
    //             success: true,
    //             data: user,
    //         });
    //     } catch (error) {
    //         return sendResponse(res, {
    //             status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    //             message: RESPONSE_MESSAGES.INTERNAL_ERROR,
    //             success: false,
    //             error: error,
    //         });
    //     }
    // }

    // async getUserByDepartmentRole(req, res) {
    //     const { department, role } = req.query;
    //     try {
    //         // const user = await userService.getUserByDepartmentRole(req.body);
    //         const user = await userService.getUserByDepartmentRole({ department, role });
    //         return sendResponse(res, {
    //             status: HTTP_STATUS.OK,
    //             message: RESPONSE_MESSAGES.USER_BY_DEPARTMENT_ROLE,
    //             success: true,
    //             data: user,
    //         });
    //     } catch (error) {
    //         return sendResponse(res, {
    //             status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    //             message: RESPONSE_MESSAGES.INTERNAL_ERROR,
    //             success: false,
    //             error: error,
    //         });
    //     }
    // }
}

export default new UsersController();
