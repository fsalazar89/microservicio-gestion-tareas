import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class Middleware {

  constructor() {}

  validarTokenJWT = (req: Request, res: Response, next: NextFunction) => {
    const secreto = process.env.SECRET_TOKEN_JWT || "";
    try {
      const apitoken: any = req.headers.authorization?.replace("Bearer ", "");
      const decoded = jwt.verify(apitoken, secreto);
      if (decoded) {
        console.log(decoded);
        if (req.body) {
          req.body.datos_usuario = decoded
        } else {
          req.query.datos_usuario = JSON.stringify(decoded);
        }
        next();
      }
    } catch (error) {
      res.status(401).json({
        estado: false,
        mensaje: `Acceso denegado`,
        datos: null,
      });
      return;
    }
  };

}
