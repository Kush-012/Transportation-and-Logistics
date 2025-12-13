const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Auth token required" });
    } 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;       
    req.email = decoded.email;  
    req.role = decoded.role;
    req.name= decoded.name;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authenticateUser;
