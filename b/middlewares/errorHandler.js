/**
 * Centralized Error Handler Middleware
 * Catches and formats all errors from route handlers
 */

class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Global Error Handler Middleware
 * Should be added as the LAST middleware in the Express app
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function errorHandler(err, req, res, next) {
  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let details = err.details || null;

  // Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    details = Object.keys(err.errors).map(field => ({
      field,
      message: err.errors[field].message
    }));
  }

  // Handle Mongoose Cast Errors
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.kind}`;
    details = { field: err.path, value: err.value };
  }

  // Handle Mongoose Duplicate Key Errors
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
    details = { field, value: err.keyValue[field] };
  }

  // Handle JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  }

  // Handle Multer Errors
  if (err.name === "MulterError") {
    statusCode = 400;
    if (err.code === "FILE_TOO_LARGE") {
      message = "File size exceeds maximum limit";
    } else if (err.code === "LIMIT_FILE_COUNT") {
      message = "Too many files uploaded";
    } else {
      message = "File upload error";
    }
  }

  // Handle CORS Errors
  if (err.message === "Not allowed by CORS") {
    statusCode = 403;
    message = "CORS policy violation: Origin not allowed";
  }

  // Log error details for debugging
  if (process.env.NODE_ENV !== "production") {
    console.error("❌ Error:", {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method,
      ...(details && { details })
    });
  }

  // Send error response
  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && details && { details }),
    ...(process.env.NODE_ENV !== "production" && { timestamp: new Date().toISOString() })
  };

  // Prevent XSS attacks in error messages
  if (statusCode >= 500) {
    response.message = "Internal Server Error";
  }

  res.status(statusCode).json(response);
}

/**
 * Async Error Wrapper
 * Wraps async route handlers to catch errors and pass to error handler
 * @param {Function} fn - Async route handler function
 * @returns {Function} - Wrapped function
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  errorHandler,
  asyncHandler,
  AppError
};
