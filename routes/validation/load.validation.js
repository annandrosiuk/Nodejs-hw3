const Joi = require('@hapi/joi');

module.exports = {
  create: Joi.object({
    length: Joi.number()
      .integer()
      .required(),

    width: Joi.number()
      .integer()
      .required(),

    height: Joi.number()
      .integer()
      .required(),

    payload: Joi.number()
      .integer()
      .required(),
  }),

  post: Joi.object({
    loadId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .required(),
  }),

  assign: Joi.object({
    loadId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .required(),
  }),

  updateInfo: Joi.object({
    loadId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .required(),

    length: Joi.number()
      .integer()
      .required(),

    width: Joi.number()
      .integer()
      .required(),

    height: Joi.number()
      .integer()
      .required(),

    payload: Joi.number()
      .integer()
      .required(),
  }),

  updateState: Joi.object({
    loadId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .required(),

    state: Joi.string()
      .required(),
  }),

  finish: Joi.object({
    loadId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .required(),

    state: Joi.string()
      .required(),
  }),

  assignedDriver: Joi.object({
    loadId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .required(),
  }),

  delete: Joi.object({
    loadId: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+$'))
      .required(),
  }),
};
