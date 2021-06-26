const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const authValidate = {
  signup: async (req, res, next) => {
    try {
      const schema = joi
        .object({
          first_name: joi.string().required(),
          last_name: joi.string().required(),
          email: joi.string().email().required(),
          password: new passwordComplexity({
            min: 8,
            max: 255,
            lowerCase: 1,
            upperCase: 1,
            requirementCount: 4,
          }),
        })
        .options({ abortEarly: false });

      const result = await schema.validate(req.body);

      if (result.error) {
        res.status(422).json({
          statusCode: 422,
          statusText: "Unprocessable Entity",
          message: result.error.details[0].message,
        });
      } else next();
    } catch (error) {
      res
        .json({
          statusCode: 500,
          statusText: "Internal Server Error",
          message: error.message,
        })
        .status(500);
    }
  },
};

module.exports = authValidate;
