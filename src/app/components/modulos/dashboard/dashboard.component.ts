import {Component, OnInit} from '@angular/core';
import {ClienteModel} from '../clientes/cliente.model';
import {ClientesService} from '../../../services/clientes.service';
import swal from 'sweetalert2';
import {RolModel} from '../roles/rol.model';
import {RolesService} from '../../../services/roles.service';
import {PrestamoModel} from '../prestamos/prestamo.model';
import {PrestamosService} from '../../../services/prestamos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  prestamos: PrestamoModel[];
  clientes: ClienteModel[];
  roles: RolModel[];

  constructor(private prestamosService: PrestamosService,
              private clientesService: ClientesService,
              private rolesService: RolesService) {
  }

  ngOnInit() {
    this.prestamos = new Array();
    this.clientes = new Array();
    this.roles = new Array();
    this.getAllPrestamos();
    this.getAllClientes();
    this.getAllRoles();
  }

  getAllPrestamos() {
    this.prestamosService.getAll().subscribe(
      response => {
        console.log(response);
        this.prestamos = response;
      },
      (errors) => {
        swal.fire('Ocurrió un error al Obtener los prestamos', errors.message, 'error');
      }
    );
  }


  getAllClientes() {
    this.clientesService.getAll().subscribe(
      response => {
        console.log(response);
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
        console.log(response);
        this.roles = response;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Roles', errors.message, 'error');
      }
    );
  }

}
