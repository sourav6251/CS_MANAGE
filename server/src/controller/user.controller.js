import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import userService from "../services/user.service.js";
import { sendResponse } from "../utils/response.handler.js";

class UserController {
    async createUser(req, res) {
        try {
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                profile_pic: {
                    url: req.body.url,
                    public_id: req.body.public_id,
                },
                role: req.body.role,
            };

            const user = await userService.RegisterUser(
                userData,
                req.body.role,
                req.body.departmentID,
                req.body.departmentName
            );
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

    async showAllUser(req, res) {
        try {
            const user = await userService.showuser();
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

    async loginUser(req, res) {
        try {
            const user = await userService.login(req.body);
    
            if (user === "notExist") {
                return sendResponse(res, {
                    status: 404,
                    message: "User doesn't exist",
                    success: false,
                    error: "Invalid email or password",
                });
            }
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.USER_LOGGED_IN || "User logged in successfully",
                success: true,
                data: user,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error.message || "Something went wrong",
            });
        }
    }
    
}

export default new UserController();
