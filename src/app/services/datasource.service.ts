import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incindencias } from '../model/Incidencia';
import { Observable } from 'rxjs';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  constructor(private link: HttpClient) { }

  getIncidencias(){

    const list$ = this.link.get<Incindencias[]>('./assets/json/api.json');

    return list$;
  }
}
