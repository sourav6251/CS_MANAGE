import { sendResponse } from "../utils/response.handler.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import noticeboardService from "../services/notice.service.js";

class NoticeboardController {
    // Create a new notice
    async createNotice(req, res) {
        try {
            const notice = await noticeboardService.createNotice(req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.NOTICE_CREATED,
                success: true,
                data: notice,
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

    // Update an existing notice
    async updateNotice(req, res) {
        try {
            const notice = await noticeboardService.updateNotice(
                req.params.noticeId,
                req.body
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.NOTICE_UPDATED,
                success: true,
                data: notice,
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

    // Show notices with optional filters
    async showNotices(req, res) {
        try {
            const notices = await noticeboardService.showNotices(req.query);

            if (notices && notices.length > 0) {
                return sendResponse(res, {
                    status: HTTP_STATUS.OK,
                    message: RESPONSE_MESSAGES.NOTICE_GET,
                    success: true,
                    data: notices,
                });
            }

            return sendResponse(res, {
                status: HTTP_STATUS.NO_CONTENT,
                message: RESPONSE_MESSAGES.NO_NOTICE,
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

    // Delete a notice
    async deleteNotice(req, res) {
        try {
            const notice = await noticeboardService.deleteNotice(req.params.noticeId);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.NOTICE_DELETE,
                success: true,
                data: notice,
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

export default new NoticeboardController();
