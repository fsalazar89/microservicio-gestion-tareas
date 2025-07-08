import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ModelTareas } from "../models/model.tareas";

export class ControllerTareas{
  private algorithm: any = process.env.ALGORITMO;
  private key: any = Buffer.from(process.env.KEY_ENCRIPT || "", "utf8");
  private iv: any = Buffer.from(process.env.IV_ENCRIPT || "", "utf8");
  private modelTareas: ModelTareas;

  constructor() {
    this.modelTareas = new ModelTareas();
  }
  
  controllerRegistrarTarea = async (req: Request, res: Response) => {
    let respuesta: any = { estado: false, mensaje: null, datos: null };
    try {
      const datosTarea: any =
        await this.modelTareas.modelRegistrarTarea(req.body);
      if (datosTarea.estado == false) {
        respuesta.estado = false;
        respuesta.mensaje = "Fallo registrando la tarea";
        respuesta.datos = datosTarea.datos;
        res.status(401).json(respuesta);
        return;
      } else {
        respuesta.estado = true;
        respuesta.mensaje = "Tarea creda exitosamente";
        respuesta.datos = datosTarea.datos;
        res.status(200).json(respuesta);
        return;
      }
    } catch (error) {
      respuesta.estado = false;
      respuesta.mensaje = "Error inesperado";
      respuesta.datos = error;
      res.status(400).json(respuesta);
      return;
    }
  };
  
  controllerConsultarTarea = async (req: Request, res: Response) => {
    let respuesta: any = { estado: false, mensaje: null, datos: null };
    try {
      const listaTarea: any =
        await this.modelTareas.modelConsultarTareas();
      if (listaTarea.estado == false) {
        respuesta.estado = false;
        respuesta.mensaje = "Fallo listando las tareas";
        respuesta.datos = listaTarea.datos;
        res.status(401).json(respuesta);
        return;
      } else {
        respuesta.estado = true;
        respuesta.mensaje = listaTarea.datos.length > 0 ? "Tareas listadas exitosamente" : "El usuario no tiene tareas";
        respuesta.datos = listaTarea.datos;
        res.status(200).json(respuesta);
        return;
      }
    } catch (error) {
      respuesta.estado = false;
      respuesta.mensaje = "Error inesperado";
      respuesta.datos = error;
      res.status(400).json(respuesta);
      return;
    }
  };
  
  controllerActualizarTarea = async (req: Request, res: Response) => {
    let respuesta: any = { estado: false, mensaje: null, datos: null };
    try {
      const infoTarea: any =
        await this.modelTareas.modelActualizarTarea(req.body);
      if (infoTarea.estado == false) {
        respuesta.estado = false;
        respuesta.mensaje = "Fallo la actualizacion de la tarea";
        respuesta.datos = infoTarea.datos;
        res.status(401).json(respuesta);
        return;
      } else if (infoTarea.datos.length == 0) {
        respuesta.estado = false;
        respuesta.mensaje = "No se encontro la tarea";
        respuesta.datos = infoTarea.datos;
        res.status(401).json(respuesta);
        return;
      } else {
        respuesta.estado = true;
        respuesta.mensaje = "Tarea actualizada exitosamente";
        respuesta.datos = infoTarea.datos[0];
        res.status(200).json(respuesta);
        return;
      }
    } catch (error) {
      respuesta.estado = false;
      respuesta.mensaje = "Error inesperado";
      respuesta.datos = error;
      res.status(400).json(respuesta);
      return;
    }
  };
  
  controllerEliminarTarea = async (req: Request, res: Response) => {
    let respuesta: any = { estado: false, mensaje: null, datos: null };
    try {
      const infoTarea: any =
        await this.modelTareas.modelEliminarTarea(req.body);
      if (infoTarea.estado == false) {
        respuesta.estado = false;
        respuesta.mensaje = "Fallo la elimnacion de la tarea";
        respuesta.datos = infoTarea.datos;
        res.status(401).json(respuesta);
        return;
      } else if (infoTarea.datos.length == 0) {
        respuesta.estado = false;
        respuesta.mensaje = "No se encontro la tarea";
        respuesta.datos = infoTarea.datos;
        res.status(401).json(respuesta);
        return;
      } else {
        respuesta.estado = true;
        respuesta.mensaje = "Tarea eliminada exitosamente";
        respuesta.datos = infoTarea.datos[0];
        res.status(200).json(respuesta);
        return;
      }
    } catch (error) {
      respuesta.estado = false;
      respuesta.mensaje = "Error inesperado";
      respuesta.datos = error;
      res.status(400).json(respuesta);
      return;
    }
  };

}
