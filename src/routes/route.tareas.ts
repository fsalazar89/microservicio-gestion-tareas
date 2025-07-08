// src/routes/InitRoute.ts
import { Router } from "express";
import { ValidaCamposTareas } from "../middlewares/campos.tareas";
import { ControllerTareas } from "../controllers/controller.tareas";
import { Middleware } from "../middlewares/middlewares";

export class TareasRoute {
  public router: Router;
  private validaCamposTareas: ValidaCamposTareas;
  private controllerTareas: ControllerTareas;
  private middleware: Middleware;

  constructor() {
    this.router = Router();
    this.validaCamposTareas = new ValidaCamposTareas();
    this.controllerTareas = new ControllerTareas();
    this.middleware = new Middleware();
    this.initializarRutas();
  }

  private initializarRutas() {
    this.router.post(
      "/tareas/registrar_tarea",
      this.middleware.validarTokenJWT,
      this.validaCamposTareas.validacionCamposRegistroTarea,
      this.controllerTareas.controllerRegistrarTarea.bind(
        this.controllerTareas
      )
    );
    
    this.router.get(
      "/tareas/listar_tarea",
      this.middleware.validarTokenJWT,
      this.controllerTareas.controllerConsultarTarea.bind(
        this.controllerTareas
      )
    );
    
    this.router.put(
      "/tareas/actualizar_tarea",
      this.middleware.validarTokenJWT,
      this.validaCamposTareas.validacionCamposActualizarTarea,
      this.controllerTareas.controllerActualizarTarea.bind(
        this.controllerTareas
      )
    );
    
    this.router.delete(
      "/tareas/eliminar_tarea",
      this.middleware.validarTokenJWT,
      this.validaCamposTareas.validacionCamposEliminarTarea,
      this.controllerTareas.controllerEliminarTarea.bind(
        this.controllerTareas
      )
    );

  }
}
