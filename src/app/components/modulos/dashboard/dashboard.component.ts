import {Component, OnInit} from '@angular/core';
import {ClienteModel} from '../clientes/cliente.model';
import {ClientesService} from '../../../services/clientes.service';
import swal from 'sweetalert2';
import {RolModel} from '../roles/rol.model';
import {RolesService} from '../../../services/roles.service';
import {DashboardService} from '../../../services/dashboard.service';
import {DashboardModel} from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardModel: DashboardModel;

  clientes: ClienteModel[];
  roles: RolModel[];

  constructor(private dashboardService: DashboardService,
              private clientesService: ClientesService,
              private rolesService: RolesService) {
  }

  ngOnInit() {
    this.dashboardModel = new DashboardModel();

    this.clientes = new Array();
    this.roles = new Array();
    this.get();

    this.getAllClientes();
    this.getAllRoles();
  }

  get() {

    // this.dashboardService.get().subscribe((dashboardModel) => this.dashboardModel = dashboardModel);

    this.dashboardService.get().subscribe(
      dashboardModel => {
        this.dashboardModel = dashboardModel.dashboard;
      },
      (errors) => {
        swal.fire('Ocurrió un error al Obtener el Dashboard', errors.message, 'error');
      }
    );
  }


  getAllClientes() {
    this.clientesService.getAll().subscribe(
      response => {
        this.clientes = response;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Clientes', errors.message, 'error');
      }
    );
  }

  getAllRoles() {
    this.rolesService.getAll().subscribe(
      response => {
        this.roles = response;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Roles', errors.message, 'error');
      }
    );
  }

}
