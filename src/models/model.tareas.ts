const pool = require("../configs/db_conn/db.microservicio");
import { Utils } from "../utils/utils";

export class ModelTareas {
  private utils: Utils;

  constructor() {
    this.utils = new Utils();
  }

  modelRegistrarTarea = async (datos: any) => {
    let client;
    try {
      client = await pool.connect();
      let querySql = `
      INSERT INTO tareas.tab_tareas (id_estado, titulo_tarea, descripcion_tarea, fecha_vencimiento, id_usuario)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING titulo_tarea, descripcion_tarea, fecha_creacion, fecha_vencimiento, id_usuario, id_estado`;
      const resultadoConsulta = await client.query(querySql, [
        datos.id_estado,
        datos.titulo_tarea,
        datos.descripcion_tarea,
        datos.fecha_vencimiento,
        datos.id_usuario,
      ]);
      return { estado: true, datos: resultadoConsulta.rows[0] };
    } catch (error) {
      return { estado: false, datos: error };
    } finally {
      if (client) client.release();
    }
  };

  modelConsultarTareas = async () => {
    let client;
    try {
      client = await pool.connect();
      let querySql = `SELECT
      ttt.id_estado AS id_estado,
      tte.nombre AS nombre_estado,
      ttt.titulo_tarea, 
      ttt.descripcion_tarea, 
      ttt.fecha_creacion AS fecha_creacion_tarea, 
      ttt.fecha_vencimiento AS fecha_vencimiento_tarea, 
      ttt.id_usuario,
      atu.nombre AS nombre_usuario,
      atu.usuario AS usuario_login
      FROM tareas.tab_tareas ttt
      INNER JOIN tareas.tab_estados tte ON tte.id = ttt.id_estado
      INNER JOIN autenticacion.tab_usuarios atu ON atu.id = ttt.id_usuario`;
      const resultadoConsulta = await client.query(querySql, []);
      return { estado: true, datos: resultadoConsulta.rows };
    } catch (error) {
      return { estado: false, datos: error };
    } finally {
      if (client) client.release();
    }
  };

  modelActualizarTarea = async (datos: any) => {
    let client;
    try {
      client = await pool.connect();
      let querySql = `
      UPDATE tareas.tab_tareas
      SET titulo_tarea = $1,
      descripcion_tarea = $2,
      fecha_vencimiento = $3,
      fecha_actualizacion = $4,
      id_estado = $5
      WHERE id = $6 AND id_usuario = $7
      RETURNING *`;
      console.log(this.utils.utilFechaHoraColombia(datos.fecha_vencimiento));
      console.log(this.utils.utilFechaActual());
      const resultadoConsulta = await client.query(querySql, [
        datos.titulo_tarea,
        datos.descripcion_tarea,
        this.utils.utilFechaHoraColombia(datos.fecha_vencimiento),
        this.utils.utilFechaActual(),
        datos.id_estado,
        datos.id_tarea,
        datos.id_usuario,
      ]);
      return { estado: true, datos: resultadoConsulta.rows };
    } catch (error) {
      return { estado: false, datos: error };
    } finally {
      if (client) client.release();
    }
  };

  modelEliminarTarea = async (datos: any) => {
    let client;
    try {
      client = await pool.connect();
      let querySql = `
      DELETE FROM tareas.tab_tareas
      WHERE id = $1 AND id_usuario = $2
      RETURNING *`;
      const resultadoConsulta = await client.query(querySql, [
        datos.tarea,
        datos.usuario,
      ]);
      return { estado: true, datos: resultadoConsulta.rows };
    } catch (error) {
      return { estado: false, datos: error };
    } finally {
      if (client) client.release();
    }
  };









  modelRegistrarUsuario = async (datos: any) => {
    let client;
    try {
      client = await pool.connect();
      let querySql = `
      INSERT INTO autenticacion.tab_usuarios (nombre, usuario, clave)
      VALUES ($1, $2, $3)
      RETURNING nombre, usuario, fecha_creacion, estado`;
      const resultadoConsulta = await client.query(querySql, [
        datos.nombre,
        datos.usuario,
        datos.clave,
      ]);
      return { estado: true, datos: resultadoConsulta.rows[0] };
    } catch (error) {
      return { estado: false, datos: error };
    } finally {
      if (client) client.release();
    }
  };

  modelValidarUsuario = async (usuario: string) => {
    let client;
    try {
      client = await pool.connect();
      let querySql = `SELECT usuario, clave, estado FROM autenticacion.tab_usuarios WHERE usuario = $1`;
      const resultadoConsulta = await client.query(querySql, [usuario]);
      return { estado: true, datos: resultadoConsulta.rows };
    } catch (error) {
      return { estado: false, datos: error };
    } finally {
      if (client) client.release();
    }
  };
}
