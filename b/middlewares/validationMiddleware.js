// validationMiddleware.js
// Centralized input validation using express-validator

const { validationResult } = require('express-validator');

/**
 * Standardized validation error handler middleware
 * Sends 400 with all validation errors in a consistent format
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
}

module.exports = { handleValidationErrors };
