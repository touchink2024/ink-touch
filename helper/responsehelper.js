/**
 * Sends a JSON response with a standard structure.
 *
 * @param {object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code to send.
 * @param {string} message - The message to include in the response.
 * @param {*} [data] - The data to include in the response. Can be any type.
 * @param {string} [accessToken] - Optional access token to include in the response.
 */
const sendJsonResponse = (res, statusCode, message, data, accessToken) => {
  const responsePayload = {
    status: 'success',
    message,
    status_code: statusCode,
    data,
  };

  if (accessToken) {
    responsePayload.access_token = accessToken;
  }

  res.status(statusCode).json(responsePayload);
};

export { sendJsonResponse };
