function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Admin access only" });
  }
  next();
}

function requireTester(req, res, next) {
  if (req.user.role !== "tester") {
    return res.status(403).send({ message: "Tester access only" });
  }
  next();
}

module.exports = { requireAdmin, requireTester };
