exports.validate = (schema) => {
  return async (req, res, next) => {
    try {
      const { error } = await schema.validate(req.body);
      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        const errorsDetail = details.map((i) => i.message);
        res.status(422).json({
          statusText: "Unprocessable Entity",
          message: errorsDetail,
        });
      }
    } catch (error) {
      res.send(error);
    }
  };
};
