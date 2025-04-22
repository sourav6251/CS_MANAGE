import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import meetingService from "../services/meeting.service.js";
import { sendResponse } from "../utils/response.handler.js";

class MeetingController {
    async createMeeting(req, res) {
        try {
            const data = req.body;
            const meeting = await meetingService.createMeeting(data);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.MEETING_CREATED || "Meeting created successfully",
                success: true,
                data: meeting,
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

    async showMeeting(req, res) {
        try {
            const meetings = await meetingService.showMeeting(req.params.email);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.FETCH_SUCCESS || "Meetings fetched successfully",
                success: true,
                data: meetings,
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

    async updateMeeting(req, res) {
        try {
            const id = req.params.meetingId;
            const updatedMeeting = await meetingService.updateMeeting(id, req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.MEETING_UPDATED || "Meeting updated successfully",
                success: true,
                data: updatedMeeting,
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

    async deleteMeeting(req, res) {
        try {
            const id = req.params.meetingId;
            const deletedMeeting = await meetingService.deleteMeeting(id);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.MEETING_DELETED || "Meeting deleted successfully",
                success: true,
                data: deletedMeeting,
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

export default new MeetingController();
