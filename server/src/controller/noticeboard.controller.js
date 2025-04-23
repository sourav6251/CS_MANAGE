import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import noticeboardService from "../services/notice.service.js";
import { sendResponse } from "../utils/response.handler.js";

class NoticeboardController {
    async createNotice(req, res) {
        try {
            const noticeData = req.body;

            const notice = await noticeboardService.createNotice(noticeData);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.NOTICE_CREATED || "Notice created successfully",
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

    async showNotices(req, res) {
        try {
            const filterData = {
                user: req.query.user,
                department: req.query.department,
            };

            const notices = await noticeboardService.showNotices(filterData);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.FETCH_SUCCESS || "Notices fetched successfully",
                success: true,
                data: notices,
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

    async updateNotice(req, res) {
        try {
            const id = req.params.noticeId;
            const updatedNotice = await noticeboardService.updateNotice(id, req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.NOTICE_UPDATED || "Notice updated successfully",
                success: true,
                data: updatedNotice,
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

    async deleteNotice(req, res) {
        try {
            const id = req.params.noticeId;
            const deletedNotice = await noticeboardService.deleteNotice(id);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.NOTICE_DELETED || "Notice deleted successfully",
                success: true,
                data: deletedNotice,
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
