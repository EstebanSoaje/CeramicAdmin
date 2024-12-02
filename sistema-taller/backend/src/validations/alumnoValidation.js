const Joi = require('joi');

// Esquema de validación para Alumno
const validarAlumno = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().min(2).required().messages({
      'string.empty': 'El nombre no puede estar vacío.',
      'string.min': 'El nombre debe tener al menos 2 caracteres.',
      'any.required': 'El nombre es obligatorio.',
    }),
    apellido: Joi.string().min(2).required().messages({
      'string.empty': 'El apellido no puede estar vacío.',
      'string.min': 'El apellido debe tener al menos 2 caracteres.',
      'any.required': 'El apellido es obligatorio.',
    }),
    contacto: Joi.string().email().required().messages({
      'string.email': 'El contacto debe ser un correo electrónico válido.',
      'any.required': 'El contacto es obligatorio.',
    }),
    pagos: Joi.array().items(
      Joi.object({
        mes: Joi.string().required().messages({
          'any.required': 'El mes es obligatorio.',
        }),
        monto: Joi.number().positive().required().messages({
          'number.positive': 'El monto debe ser un número positivo.',
          'any.required': 'El monto es obligatorio.',
        }),
        pagado: Joi.boolean().required().messages({
          'any.required': 'El campo pagado es obligatorio.',
        }),
        fechaPago: Joi.date().optional(),
      })
    ).optional(),
  });

  return schema.validate(data, { abortEarly: false }); // Para mostrar todos los errores
};

module.exports = { validarAlumno };
