import { sendResponse } from "../utils/response.handler.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import meetingService from "../services/meeting.service.js";

class MeetingController {
    async createMeeting(req, res) {
        try {
            const syllabus = await meetingService.createMeeting(req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.MEETING_CREATED,
                success: true,
                data: syllabus,
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

    async updateMeeting(req, res) {
        try {
            const syllabus = await meetingService.updateMeeting(
                req.body,
                req.params.syllabusId
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.MEETING_UPDATED,
                success: true,
                data: syllabus,
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

    async showMeeting(req, res) {
        try {
            const syllabus = await meetingService.showMeeting(req.query);
            console.log(`syllabus => ${syllabus} `);

            if (syllabus) {
                return sendResponse(res, {
                    status: HTTP_STATUS.OK,
                    message: RESPONSE_MESSAGES.MEETING_GET,
                    success: true,
                    data: syllabus,
                });
            }

            return sendResponse(res, {
                status: HTTP_STATUS.NO_CONTENT,
                message: RESPONSE_MESSAGES.NO_MEETING,
                success: true,
                data: syllabus,
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

    async deleteMeeting(req, res) {
        try {
            const syllabus = await meetingService.deleteMeeting(
                req.params.syllabusId
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.MEETING_DELETE,
                success: true,
                data: syllabus,
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
export default new MeetingController();
