const { z } = require("zod");

const validate = (schema, type = "body") => (req, res, next) => {
  try {
    const data = type === "body" ? req.body : type === "params" ? req.params : req.query;
    const parsed = schema.parse(data);
    
    if (type === "body") req.body = parsed;
    else if (type === "params") req.params = parsed;
    else if (type === "query") req.query = parsed;
    
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation Error",
        errors: err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    next(err);
  }
};

module.exports = validate;
