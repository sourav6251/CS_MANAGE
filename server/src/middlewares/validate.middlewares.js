import { MESSAGE } from "../constants/messages.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { sendResponse } from "../utils/response.handler.js";

export const validate = (schema) => (req, res, next) => {
    // console.log("Schema Received: ", schema); // Debug log
    try {

        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        console.log(`ERROR=> ${error}  END`);
        return sendResponse(res, {
            status: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: MESSAGE.VALIDATION_FAIL,
            error: error,
            data: null,
        });
    }
};