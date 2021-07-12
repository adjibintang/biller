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

const searchCitySchema = Joi.object({
  city: Joi.string().required(),
}).options({ abortEarly: false });

const customerNumberSchema = Joi.object({
  customerNumber: Joi.string().required(),
  month: Joi.string(),
}).options({ abortEarly: false });

const registerSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .lowercase()
    .required(),
  password: passwordComplexity(complexityOptions),
  pin: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = {
  loginSchema,
  searchCitySchema,
  customerNumberSchema,
  registerSchema,
};
