const Joi = require('@hapi/joi')

const validateParam = (schema, name) => {
  return (req, res, next) => {
    console.log(schema, name)
  }
}

const schemas= {
  idSchema: Joi
}

module.exports = {
  validateParam
}