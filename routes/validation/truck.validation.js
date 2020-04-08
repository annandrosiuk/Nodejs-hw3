const Joi = require('@hapi/joi');

module.exports = {
  create: Joi.object({
    type: Joi.string()
      .valid('sprinter', 'smallStraight', 'largeStraight')
      .required(),

    truckName: Joi.string()
      .min(2)
      .max(128)
      .required(),

    brand: Joi.string()
      .min(2)
      .max(128)
      .required(),

    model: Joi.string()
      .min(2)
      .max(128)
      .required(),
  }),

  update: Joi.object({
    truckId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .required(),

    type: Joi.string()
      .valid('sprinter', 'smallStraight', 'largeStraight')
      .required(),

    truckName: Joi.string()
      .min(2)
      .max(128)
      .required(),

    brand: Joi.string()
      .min(2)
      .max(128)
      .required(),

    model: Joi.string()
      .min(2)
      .max(128)
      .required(),
  }),

  assign: Joi.object({
    truckId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .required(),
  }),

  delete: Joi.object({
    truckId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .required(),
  }),
};
