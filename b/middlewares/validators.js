// validators.js
// Reusable express-validator chains for various routes

const { body, param } = require('express-validator');

// Email validation
const emailValidator = body('email')
  .isEmail().withMessage('Invalid email address')
  .normalizeEmail();

// Password strength
const passwordValidator = body('password')
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  .matches(/[A-Za-z]/).withMessage('Password must contain a letter')
  .matches(/\d/).withMessage('Password must contain a number')
  .matches(/[@$!%*?&#^()\-_=+]/).withMessage('Password must contain a special character');

// Name
const nameValidator = body('name')
  .trim().notEmpty().withMessage('Name is required');

// Vehicle number (simple pattern, adjust as needed)
const vehicleNumberValidator = body('vehicleNumber')
  .trim().notEmpty().withMessage('Vehicle number is required')
  .matches(/^[A-Z0-9-]{6,15}$/i).withMessage('Invalid vehicle number format');

// Capacity
const capacityValidator = body('capacityInKg')
  .isFloat({ gt: 0 }).withMessage('Capacity must be a positive number');

// Price per km
const pricePerKmValidator = body('pricePerKm')
  .isFloat({ gt: 0 }).withMessage('Price per km must be a positive number');

// Booking fields
const bookingValidators = [
  body('shipperEmail').isEmail().withMessage('Invalid shipper email'),
  body('driverEmail').isEmail().withMessage('Invalid driver email'),
  body('vehicleNo').notEmpty().withMessage('Vehicle number is required'),
  body('pickupLocation').notEmpty().withMessage('Pickup location is required'),
  body('dropLocation').notEmpty().withMessage('Drop location is required'),
  body('distanceInKm').isFloat({ gt: 0 }).withMessage('Distance must be a positive number'),
  body('totalFare').isFloat({ min: 0 }).withMessage('Total fare must be a non-negative number')
];

// AI request (example: prompt field)
const aiRequestValidator = body('prompt')
  .trim().notEmpty().withMessage('Prompt is required');

module.exports = {
  emailValidator,
  passwordValidator,
  nameValidator,
  vehicleNumberValidator,
  capacityValidator,
  pricePerKmValidator,
  bookingValidators,
  aiRequestValidator
};
