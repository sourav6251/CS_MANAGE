import { sendResponse } from "../utils/response.handler.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import meetingService from "../services/meeting.service.js";

class MeetingController {
  async createMeeting(req, res) {
    try {
      const meeting = await meetingService.createMeeting(req.body);
      return sendResponse(res, {
        status: HTTP_STATUS.CREATED,
        message: RESPONSE_MESSAGES.MEETING_CREATED,
        success: true,
        data: meeting,
      });
    } catch (error) {
      return sendResponse(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGES.INTERNAL_ERROR,
        success: false,
        error: error.message,
      });
    }
  }

  async updateMeeting(req, res) {
    try {
      const meeting = await meetingService.updateMeeting(req.body, req.params.meetingId); // Fixed meetingId
      return sendResponse(res, {
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.MEETING_UPDATED,
        success: true,
        data: meeting,
      });
    } catch (error) {
      return sendResponse(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGES.INTERNAL_ERROR,
        success: false,
        error: error.message,
      });
    }
  }

  async showMeeting(req, res) {
    try {
      const meetings = await meetingService.showMeeting(req.query);
      if (meetings && meetings.length > 0) {
        return sendResponse(res, {
          status: HTTP_STATUS.OK,
          message: RESPONSE_MESSAGES.MEETING_GET,
          success: true,
          data: meetings,
        });
      }
      return sendResponse(res, {
        status: HTTP_STATUS.NO_CONTENT,
        message: RESPONSE_MESSAGES.NO_MEETING,
        success: true,
        data: [],
      });
    } catch (error) {
      return sendResponse(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGES.INTERNAL_ERROR,
        success: false,
        error: error.message,
      });
    }
  }

  async deleteMeeting(req, res) {
    try {
      const meeting = await meetingService.deleteMeeting(req.params.meetingId); // Fixed meetingId
      return sendResponse(res, {
        status: HTTP_STATUS.OK,
        message: RESPONSE_MESSAGES.MEETING_DELETE,
        success: true,
        data: meeting,
      });
    } catch (error) {
      return sendResponse(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGES.INTERNAL_ERROR,
        success: false,
        error: error.message,
      });
    }
  }
}

export default new MeetingController();