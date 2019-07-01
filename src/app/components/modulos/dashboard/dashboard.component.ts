import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {DashboardService} from '../../../services/dashboard.service';
import {DashboardModel} from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardModel: DashboardModel;
  fechaDesde: string;
  fechaHasta: string;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.dashboardModel = new DashboardModel();
    const d = new Date();
    this.fechaDesde = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + 1;
    this.fechaHasta = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.get(this.fechaDesde, this.fechaHasta);
  }

  consultarMovimiento() {
    this.get(this.fechaDesde, this.fechaHasta);
  }

  get(fechaDesde: string, fechaHasta: string) {
    this.dashboardService.get(fechaDesde, fechaHasta).subscribe(
      dashboardModel => {
        this.dashboardModel = dashboardModel.dashboard;
      },
      (errors) => {
        swal.fire('Ocurrió un error al Obtener el Dashboard', errors.message, 'error');
      }
    );
  }

}
