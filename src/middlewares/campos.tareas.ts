import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { Utils } from "../utils/utils";

export class ValidaCamposTareas {
  private utils: Utils;

  constructor() {
    this.utils = new Utils();
  }

  private datos_usuario = Joi.object().optional().messages({
    "object.base": "El campo datos_usuario debe ser un objeto",
  });

  // ------- Registro Tarea ------
  private registro_id_estado = Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "El campo id_estado debe ser un número",
      "number.integer": "El campo id_estado debe ser un número entero",
      "number.min": "El campo id_estado debe ser mayor o igual a 1",
      "any.required": "El campo id_estado es obligatorio",
    });

  private registro_id_usuario = Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "El campo id_usuario debe ser un número",
      "number.integer": "El campo id_usuario debe ser un número entero",
      "number.min": "El campo id_usuario debe ser mayor o igual a 1",
      "any.required": "El campo id_usuario es obligatorio",
    });

  private registro_titulo_tarea = Joi.string()
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ0-9\s.,;:()¿?¡!'"%\-_]+$/)
    .max(100)
    .required()
    .messages({
      "string.pattern.base": "El campo título contiene caracteres no válidos",
      "string.max": "El campo título no puede tener más de 100 caracteres",
      "any.required": "El campo título es obligatorio",
      "string.empty": "El campo título es obligatorio",
    });

  private registro_descripcion_tarea = Joi.string()
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ0-9\s.,;:()¿?¡!'"%\-_]+$/)
    .max(500)
    .required()
    .messages({
      "string.pattern.base":
        "El campo descripción contiene caracteres no válidos",
      "string.max": "El campo descripción no puede tener más de 500 caracteres",
      "any.required": "El campo descripción es obligatorio",
      "string.empty": "El campo descripción es obligatorio",
    });

  private registro_fecha_vencimiento = Joi.date()
    .greater("now")
    .required()
    .messages({
      "date.base": "El campo fecha_vencimiento debe ser una fecha válida",
      "date.greater":
        "La fecha de vencimiento debe ser mayor a la fecha actual",
      "any.required": "El campo fecha_vencimiento es obligatorio",
    });

  // ------- Fin Registro Tarea ------

  // ------- Actualizar Tarea ------
  private actualizar_id_tarea = Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "El campo id_tarea debe ser un número",
      "number.integer": "El campo id_tarea debe ser un número entero",
      "number.min": "El campo id_tarea debe ser mayor o igual a 1",
      "any.required": "El campo id_tarea es obligatorio",
    });

  private actualizar_id_estado = Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "El campo id_estado debe ser un número",
      "number.integer": "El campo id_estado debe ser un número entero",
      "number.min": "El campo id_estado debe ser mayor o igual a 1",
      "any.required": "El campo id_estado es obligatorio",
    });

  private actualizar_id_usuario = Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "El campo id_usuario debe ser un número",
      "number.integer": "El campo id_usuario debe ser un número entero",
      "number.min": "El campo id_usuario debe ser mayor o igual a 1",
      "any.required": "El campo id_usuario es obligatorio",
    });

  private actualizar_titulo_tarea = Joi.string()
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ0-9\s.,;:()¿?¡!'"%\-_]+$/)
    .max(100)
    .required()
    .messages({
      "string.pattern.base": "El campo título contiene caracteres no válidos",
      "string.max": "El campo título no puede tener más de 100 caracteres",
      "any.required": "El campo título es obligatorio",
      "string.empty": "El campo título es obligatorio",
    });

  private actualizar_descripcion_tarea = Joi.string()
    .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ0-9\s.,;:()¿?¡!'"%\-_]+$/)
    .max(500)
    .required()
    .messages({
      "string.pattern.base":
        "El campo descripción contiene caracteres no válidos",
      "string.max": "El campo descripción no puede tener más de 500 caracteres",
      "any.required": "El campo descripción es obligatorio",
      "string.empty": "El campo descripción es obligatorio",
    });

  private actualizar_fecha_vencimiento = Joi.date()
    .greater("now")
    .required()
    .messages({
      "date.base": "El campo fecha_vencimiento debe ser una fecha válida",
      "date.greater":
        "La fecha de vencimiento debe ser mayor a la fecha actual",
      "any.required": "El campo fecha_vencimiento es obligatorio",
    });
  // ------- Fin Actualizar Tarea ------

  // ------- Eliminar Tarea ------
  private eliminar_tarea = Joi.number().integer().min(1).required().messages({
    "number.base": "El campo tarea debe ser un número",
    "number.integer": "El campo tarea debe ser un número entero",
    "number.min": "El campo tarea debe ser mayor o igual a 1",
    "any.required": "El campo tarea es obligatorio",
  });

  private eliminar_usuario = Joi.number().integer().min(1).required().messages({
    "number.base": "El campo usuario debe ser un número",
    "number.integer": "El campo usuario debe ser un número entero",
    "number.min": "El campo usuario debe ser mayor o igual a 1",
    "any.required": "El campo usuario es obligatorio",
  });

  // ------- Fin Eliminar Tarea ------

  public validacionCamposRegistroTarea = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      datos_usuario: this.datos_usuario,
      id_estado: this.registro_id_estado,
      id_usuario: this.registro_id_usuario,
      titulo_tarea: this.registro_titulo_tarea,
      descripcion_tarea: this.registro_descripcion_tarea,
      fecha_vencimiento: this.registro_fecha_vencimiento,
    });
    if (req.body.fecha_vencimiento) {
      req.body.fecha_vencimiento = this.utils.utilFechaHoraColombia(
        req.body.fecha_vencimiento
      );
    }
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      const errores = error.details.map((err) => ({
        mensaje: err.message,
        campo: err.context?.key,
        valor: err.context?.value,
      }));

      res.status(401).json({
        estado: false,
        mensaje: `Error en validación de datos`,
        datos: errores,
      });
      return;
    } else {
      next();
    }
  };

  public validacionCamposActualizarTarea = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      datos_usuario: this.datos_usuario,
      id_tarea: this.actualizar_id_tarea,
      id_estado: this.actualizar_id_estado,
      id_usuario: this.actualizar_id_usuario,
      titulo_tarea: this.actualizar_titulo_tarea,
      descripcion_tarea: this.actualizar_descripcion_tarea,
      fecha_vencimiento: this.actualizar_fecha_vencimiento,
    });
    if (req.body.fecha_vencimiento) {
      req.body.fecha_vencimiento = this.utils.utilFechaHoraColombia(
        req.body.fecha_vencimiento
      );
    }
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      const errores = error.details.map((err) => ({
        mensaje: err.message,
        campo: err.context?.key,
        valor: err.context?.value,
      }));

      res.status(401).json({
        estado: false,
        mensaje: `Error en validación de datos`,
        datos: errores,
      });
      return;
    } else {
      next();
    }
  };

  public validacionCamposEliminarTarea = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      datos_usuario: this.datos_usuario,
      tarea: this.eliminar_tarea,
      usuario: this.eliminar_usuario,
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      const errores = error.details.map((err) => ({
        mensaje: err.message,
        campo: err.context?.key,
        valor: err.context?.value,
      }));

      res.status(401).json({
        estado: false,
        mensaje: `Error en validación de datos`,
        datos: errores,
      });
      return;
    } else {
      next();
    }
  };
}
