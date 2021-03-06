const Joi = require('joi')

const task = Joi.object().keys({
  completed: Joi.bool().example(false),
  title: Joi.string().required().example('Provide response example'),
  id: Joi.number().required().example(1),
})

module.exports = {
  single: Joi.object().keys({
    result: task,
  }),
  list: Joi.object().keys({
    result: Joi.array().items(task),
  }),
  task: task,
}
