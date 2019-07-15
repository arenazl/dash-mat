import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incindencias, RendimientoByGrupo, IncidenciasAnual } from '../model/Incidencia';
import { Observable } from 'rxjs';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { DataTableComponent, DataTable } from '../tables/datatable.net/datatable.component';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  constructor(private link: HttpClient) { }

  getIncidenciasP() {
    const url = './assets/json/IncidenciasPendientes.json';
    return this.link.get<Incindencias[]>(url);
  }

  getIncidenciasC() {
    const url = './assets/json/IncidenciasIngresadas.json';
    return this.link.get<Incindencias[]>(url);
  }
  getIncidenciasR() {
    const url = './assets/json/IncidenciasResueltas.json';
    return this.link.get<Incindencias[]>(url);
  }

  getIncidenciasByOfficeA() {
    const list = this.link.get<RendimientoByGrupo[]>('./assets/json/IncidenciasByGrupoA.json');
    return list;
  }

  getIncidenciasByOfficeM() {
    const list = this.link.get<RendimientoByGrupo[]>('./assets/json/IncidenciasByGrupoM.json');
    return list;
  }

  getIncidenciasByYearA() {
    const list = this.link.get<IncidenciasAnual[]>('./assets/json/IncidenciasByYearA.json');
    return list;
  }
  getIncidenciasByYearM() {
    const list = this.link.get<IncidenciasAnual[]>('./assets/json/IncidenciasByYearM.json');
    return list;
  }
}
