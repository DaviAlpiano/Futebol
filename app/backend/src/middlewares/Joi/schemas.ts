import * as Joi from '@hapi/joi';

type Schemas = {
  loginSchema: Joi.ObjectSchema;
};
const someRequired = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().required().empty('').email()
    .messages({
      'any.required': someRequired,
      'string.empty': someRequired,
      'string.email': 'Invalid email or password',
    }),
  password: Joi.string().required().empty('').min(6)
    .messages({
      'any.required': someRequired,
      'string.empty': someRequired,
      'string.min': 'Invalid email or password',
    }),
});

const schemas: Schemas = {
  loginSchema,
};

export default schemas;
