const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 8,
  max: 30,
  lowercase: 1,
  upperCase: 1,
  numeric: 1,
};

const loginSchema = Joi.object({
  password: passwordComplexity(complexityOptions),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .lowercase()
    .required(),
}).options({ abortEarly: false });

module.exports = {
  loginSchema,
};
