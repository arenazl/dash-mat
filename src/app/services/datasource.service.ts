import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incindencias } from '../model/Incidencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  constructor(private link: HttpClient) { }

  getIncidencias(){
    return this.link.get<Incindencias[]>('./assets/json/api.json');
  }
}
