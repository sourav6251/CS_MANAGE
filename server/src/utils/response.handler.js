export const sendResponse = (res, { status, success, message, error, data }) => {
    const response = {
        success,
        message,
    };
    if (data !== null) {
        response.data = data;
    }
    if (error !== null) {
        response.error = error;
    }
    console.log(response);

    return res.status(status).json(response);
};