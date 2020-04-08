const Joi = require('@hapi/joi');

module.exports = {
  updateUser: Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(128)
      .required(),

    lastName: Joi.string()
      .min(2)
      .max(128)
      .required(),

    username: Joi.string()
      .min(6)
      .max(128)
      .required(),

    email: Joi.string()
      .pattern(new RegExp('^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$'))
      .required(),

    mobileNumber: Joi.number()
      .integer()
      .required(),
  }),

  updatePassword: Joi.object({
    newPassword: Joi.string()
      .min(6)
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%&*]{3,25}$'))
      .required(),

    oldPassword: Joi.string()
      .min(6)
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%&*]{3,25}$'))
      .required(),
  }),
};
