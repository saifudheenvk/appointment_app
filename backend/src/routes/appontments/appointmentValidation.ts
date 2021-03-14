const Joi = require("@hapi/joi");

const bookingValidation = (data: any) => {
  const bookingValidationSchema = Joi.object({
    date: Joi.number().required(),
    userId: Joi.string().required(),
  });
  return bookingValidationSchema.validate(data);
};

const dateValidation = (data: any) => {
  const dateValidationSchema = Joi.object({
    date: Joi.number().required(),
  });
  return dateValidationSchema.validate(data);
};

const userValidation = (data: any) => {
  const userValidationSchema = Joi.object({
    userId: Joi.string().required(),
  });
  return userValidationSchema.validate(data);
};

module.exports = { bookingValidation, dateValidation, userValidation };

export {};
