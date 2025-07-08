import { Application } from "express";
import {InitRoute} from "./route.init";
import {TareasRoute} from "./route.tareas";

export class RoutesConfig {
  private app: Application;
  private version = process.env.APP_VERSION || "";

  constructor(app: Application) {
    this.app = app;
  }
  public rutasMicroservicio = async () => {
    const initRoute = new InitRoute();
    this.app.use(this.version, initRoute.router);
    const tareasRoute = new TareasRoute();
    this.app.use(this.version, tareasRoute.router);
  }
}
