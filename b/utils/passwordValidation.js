const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+]).{8,}$/;

const validatePassword = (password) => {
  return passwordRegex.test(password);
};

module.exports = {
  passwordRegex,
  validatePassword,
};
