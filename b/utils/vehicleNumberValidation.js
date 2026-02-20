const INDIAN_VEHICLE_NUMBER_REGEX = /^[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{4}$/;

function normalizeVehicleNumber(vehicleNumber = "") {
  return vehicleNumber.trim().toUpperCase();
}

function isValidIndianVehicleNumber(vehicleNumber = "") {
  const normalizedVehicleNumber = normalizeVehicleNumber(vehicleNumber);
  return INDIAN_VEHICLE_NUMBER_REGEX.test(normalizedVehicleNumber);
}

module.exports = {
  INDIAN_VEHICLE_NUMBER_REGEX,
  normalizeVehicleNumber,
  isValidIndianVehicleNumber,
};
