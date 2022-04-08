const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");
// const User = require('./models/users');

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});
const Joi = BaseJoi.extend(extension);
module.exports.userSchema = Joi.object({
  email: Joi.string().required().email().escapeHTML()
});
module.exports.userCommentSchema = Joi.object({
  comment: Joi.string().required().escapeHTML(),
  username: Joi.string().required().escapeHTML(),
  email: Joi.string().required().email().escapeHTML()
});
