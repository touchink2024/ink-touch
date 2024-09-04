class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.status_code = statusCode;
    this.success = false;
  }
}

class BadRequest extends HttpError {
  constructor(message) {
    super(400, message);
  }
}

class ResourceNotFound extends HttpError {
  constructor(message) {
    super(404, message);
  }
}

class Unauthorized extends HttpError {
  constructor(message) {
    super(401, message);
  }
}

class Forbidden extends HttpError {
  constructor(message) {
    super(403, message);
  }
}

class Conflict extends HttpError {
  constructor(message) {
    super(409, message);
  }
}

class InvalidInput extends HttpError {
  constructor(message) {
    super(422, message);
  }
}

class ServerError extends HttpError {
  constructor(message) {
    super(500, message);
  }
}

const routeNotFound = (req, res, next) => {
  const message = `Route not found: ${req.originalUrl}`;
  res.status(404).json({ success: false, status: 404, message });
};

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.status_code || 500;
  const cleanedMessage = err.message.replace(/"/g, '');
  res.status(statusCode).json({
    success: err.success || false,
    status_code: statusCode,
    message: cleanedMessage,
  });
};

export {
  BadRequest,
  Conflict,
  Forbidden,
  HttpError,
  InvalidInput,
  ResourceNotFound,
  ServerError,
  Unauthorized,
  errorHandler,
  routeNotFound,
};
