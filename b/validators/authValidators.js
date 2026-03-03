const { z } = require("zod");
const { validatePassword } = require("../utils/passwordValidation");

const signupSchema = z.object({
  name: z.string().min(1, "Name is required").optional(), // Optional initially if sending OTP by email only? No, email is required. Name is required if OTP is not present?
  // User logic:
  // if (!otp) -> check (!name || !password) -> error "Name & Password are required"
  // So if OTP is absent, name and password are required.
  // If OTP is present, verify OTP.
  // The schema is tricky here because of the dual logic.
  // I will make name/password optional in Zod, but enforce it with .refine() or handle specific cases.
  // Or better, just make them optional and let the controller handle complex logic, OR use union types.
  // For simplicity and to not break existing dual-purpose endpoint logic too much:
  // I'll validate fields if they are present, but won't strictly enforce their presence if it depends on another field purely in Zod unless using superRefine.
  
  // Let's use superRefine to mimic controller logic.
  email: z.string().email("Invalid email format"),
  
  // If OTP is NOT present, name and password are required.
  // If OTP IS present, they are ignored or optional.
  otp: z.string().optional(),
  
  name: z.string().optional(),
  password: z.string().optional(),
  role: z.enum(["admin", "driver", "shipper", "tester"]).optional(),
}).superRefine((data, ctx) => {
  if (!data.otp) {
    if (!data.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name is required when requesting OTP",
        path: ["name"],
      });
    }
    if (!data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required when requesting OTP",
        path: ["password"],
      });
    } else {
        if (!validatePassword(data.password)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password must be at least 8 characters long and include one letter, one number, and one special character.",
                path: ["password"],
            });
        }
    }
  }
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().optional(),
  newPassword: z.string().optional(),
}).superRefine((data, ctx) => {
    // If OTP is provided, newPassword is required
    if (data.otp && !data.newPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "New password is required when verifying OTP",
            path: ["newPassword"],
        });
    }
    if (data.newPassword) {
        if (!validatePassword(data.newPassword)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password must be at least 8 characters long and include one letter, one number, and one special character.",
                path: ["newPassword"],
            });
        }
    }
});

module.exports = {
  signupSchema,
  loginSchema,
  resetPasswordSchema,
};
