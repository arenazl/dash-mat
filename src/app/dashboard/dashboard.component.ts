import { Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';
import { DatasourceService } from '../services/datasource.service';
import { Incindencias, RendimientoByGrupo, IncidenciasAnual } from '../model/Incidencia';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import * as Chartist from 'chartist';
import {ChartsComponent} from '../charts/charts.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Input } from '@angular/core';
import * as $$ from 'jQuery';
import { DataTable } from './../tables/datatable.net/datatable.component';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public tableData: TableData; // charts
  public dataTable: DataTable; // pendientes
  public dataTable2: DataTable; // resueltos
  public dataTable3: DataTable; // ingresados

  ////////////////// FX CHARTS /////////////////////

  chartFX = new ChartsComponent();

  constructor(private data_api: DatasourceService) { }

  public ngOnInit() {

  ////////////////// SIMPLE BAR CHART POR OFICINA Agil /////////////////////

    const lstGrupos = Array<string>();
    const lstCant = new Array<Array<number>>();
    let line = new Array<number>();
    let dataSimpleBarChart: any;

    const optionsSimpleBarChart = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      }
    };

    const responsiveOptionsSimpleBarChart: any = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];

    this.data_api.getIncidenciasByOfficeA().subscribe((data) => {
      data.forEach(function (value, index) {
          line.push(value.cant);
          lstGrupos.push(value.grupo_desc);
        }
      );
      lstCant.push(line);

      dataSimpleBarChart = {
        labels: lstGrupos,
        series: lstCant
      };

      console.log(lstCant);

      const simpleBarChart = new Chartist.Bar('#simpleBarChart', dataSimpleBarChart, optionsSimpleBarChart,
        responsiveOptionsSimpleBarChart);

      // start animation or the Emails Chart
      this.chartFX.startAnimationForBarChart(simpleBarChart);
    });

      ////////////////// SIMPLE BAR CHART POR OFICINA Mant. /////////////////////

    const lstGrupos2 = Array<string>();
    const lstCant2 = new Array<Array<number>>();
    const line2 = new Array<number>();
    let dataSimpleBarChart2: any;

    this.data_api.getIncidenciasByOfficeM().subscribe((data) => {
      data.forEach(function (value, index) {
        line2.push(value.cant);
        lstGrupos2.push(value.grupo_desc);
        }
      );
      lstCant2.push(line2);

      dataSimpleBarChart2 = {
        labels: lstGrupos2,
        series: lstCant2
      };

      console.log(lstCant2);

      const simpleBarChart2 = new Chartist.Bar('#simpleBarChart2', dataSimpleBarChart2, optionsSimpleBarChart,
        responsiveOptionsSimpleBarChart);

      // start animation or the Emails Chart
      this.chartFX.startAnimationForBarChart(simpleBarChart2);
    });

  ////////////////// TABLE INCIDENTES CON TABS /////////////////////

 // tabla 1 //

const lstIncidencias = new Array<Array<string>>();
 let item = new Array<string>();

   this.data_api.getIncidenciasP().subscribe((data) => {
     data.forEach(function (value, index) {
       item = [];
       item.push(value.id_incidencia.toString());
       item.push(value.estado_desc.toString());
       item.push(value.grupo_desc.toString());
       item.push(value.resumen.toString());
       item.push(value.usuario_asignado.toString());
       lstIncidencias.push(item);
       }
     );

      this.dataTable = {
        headerRow: [ 'Nro', 'Estado', 'Grupo', 'Resumen' , 'Usuario' ],
        footerRow: [ 'Nro', 'Estado', 'Grupo', 'Resumen' , 'Usuario' ],
        dataRows: lstIncidencias
      };
   });

  // tabla 2 //

  const lstIncidencias2 = new Array<Array<string>>()

    this.data_api.getIncidenciasR().subscribe((data) => {

      data.forEach(function (value, index) {
        item = [];
        item.push(value.id_incidencia.toString());
        item.push(value.estado_desc.toString());
        item.push(value.grupo_desc.toString());
        item.push(value.resumen.toString());
        item.push(value.usuario_asignado.toString());
        lstIncidencias2.push(item);
        }
      );

      this.dataTable2 = {
        headerRow: [ 'Nro', 'Estado', 'Grupo', 'Resumen' , 'Usuario' ],
        footerRow: [ 'Nro', 'Estado', 'Grupo', 'Resumen' , 'Usuario' ],
        dataRows: lstIncidencias2
       };
    });

  // tabla 2 //
  const lstIncidencias3 = new Array<Array<string>>();

  this.data_api.getIncidenciasC().subscribe((data) => {

      data.forEach(function (value, index) {
        item = [];
        item.push(value.id_incidencia.toString());
        item.push(value.estado_desc.toString());
        item.push(value.grupo_desc.toString());
        item.push(value.resumen.toString());
        item.push(value.usuario_asignado.toString());
        lstIncidencias3.push(item);
        });

        this.dataTable3 = {
          headerRow: [ 'Nro', 'Estado', 'Grupo', 'Resumen' , 'Usuario' ],
          footerRow: [ 'Nro', 'Estado', 'Grupo', 'Resumen' , 'Usuario' ],
          dataRows: lstIncidencias3
       };
    });

  /***************** MULTI CHARTS - VISTA ANUAL *********************/

  // Agil
  const lstMes = Array<string>();
  const lstMain = new Array<Array<Number>>();

    // Mant
  const lstMes2 = Array<string>();
  const lstMain2 = new Array<Array<Number>>();

   // Agil/Mant
   let dataColouredBarsChart: any;
  let dataColouredBarsChart2: any;

  // charts lineas 3 colores,
  let lstPendientes = new Array<number>();
  let lstResueltos = new Array<number>();
  let lstingresados = new Array<number>();

  let optionsColouredBarsChart: any;

  this.data_api.getIncidenciasByYearA().subscribe((data) => {
    data.forEach(function (value) {
        lstMes.push(value.mes);
        lstPendientes.push(value.pendientes);
        lstResueltos.push(value.resueltos);
        lstingresados.push(value.ingresados);
      }
    );
    lstMain.push(lstPendientes);
    lstMain.push(lstResueltos);
    lstMain.push(lstingresados);
    dataColouredBarsChart = {
      labels: lstMes,
      series: lstMain
    };
    //  Common Tasks
    optionsColouredBarsChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 10
      }),
      axisY: {
          showGrid: true,
          offset: 40
      },
      axisX: {
          showGrid: false,
      },
      low: 0,
      high: 1000,
      showPoint: true,
      height: '300px'
    };

    const colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart,
    optionsColouredBarsChart);

    this.chartFX.startAnimationForLineChart(colouredBarsChart);
  });

  const lstPendientes2 = new Array<number>();
  const lstResueltos2 = new Array<number>();
  const lstingresados2 = new Array<number>();

  this.data_api.getIncidenciasByYearM().subscribe((data) => {

    data.forEach(function (value) {
        lstMes2.push(value.mes);
        lstPendientes2.push(value.pendientes);
        lstResueltos2.push(value.resueltos);
        lstingresados2.push(value.ingresados);
      });

      lstMain2.push(lstPendientes2);
      lstMain2.push(lstResueltos2);
      lstMain2.push(lstingresados2);
      dataColouredBarsChart2 = {
        labels: lstMes2,
        series: lstMain2
      };

      const colouredBarsChart2 = new Chartist.Line('#colouredBarsChart2', dataColouredBarsChart2,
      optionsColouredBarsChart);

      this.chartFX.startAnimationForLineChart(colouredBarsChart2);
    });
}
   ngAfterViewInit() {

  ///////////////// FX TABLES /////////////////////

  $('#datatables').DataTable({
    "pagingType": "full_numbers",
    "lengthMenu": [
      [10, 25, 50, -1],
      [10, 25, 50, "All"]
    ],
    responsive: true,
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Search records",
    }
  });

  $('.card .material-datatables label').addClass('form-group');

   // Edit record
   $$('#datatables').on('click', function(e) {

    $$('#table').removeClass('col-md-12');
    $$('#table').addClass('col-md-8');

    $$('#timeline').removeClass('d-none');
    $$('#timeline').addClass('col-md-4');

   });

     // Edit record
     $$('#close').on('click', function(e) {

      $$('#table').addClass('col-md-12');
      $$('#timeline').addClass('d-none');
     });
}

}


