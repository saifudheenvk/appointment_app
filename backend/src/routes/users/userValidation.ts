const Joi = require("@hapi/joi");

const registerValidation = (data: any) => {
  const userValidationSchema = Joi.object({
    password: Joi.string().max(1024).min(6).required(),
    name: Joi.string().required(),
    email: Joi.string().min(6).max(255).email().required(),
    userType: Joi.string().required(),
    authKey: Joi.string(),
  });
  return userValidationSchema.validate(data);
};

module.exports = { registerValidation };

export {};
