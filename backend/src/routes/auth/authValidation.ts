const Joi = require("@hapi/joi");

const loginValidation = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().max(1024).min(6).required(),
    userType: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { loginValidation };

export {};
