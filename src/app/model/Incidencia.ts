export interface Incindencias {
    id_incidencia: Number;
    id_grupo: Number;
    grupo_desc: String;
    id_estado: Number;
    estado_desc: String;
    resumen: String;
    fecha_creacion: Date;
    fecha_cambio: Date;
    usuario_asignado: String;
    usuario_cambio: String;
  }


  export interface RendimientoByGrupo {
    id_grupo: number;
    grupo_desc: string;
    cant: number;
  }

  export interface IncidenciasAnual {
    mes: string;
    pendientes: number;
    resueltos: number;
    ingresados: number;
  }
