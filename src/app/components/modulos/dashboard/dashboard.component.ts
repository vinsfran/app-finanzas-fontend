import {Component, OnInit} from '@angular/core';
import {ClienteModel} from '../clientes/cliente.model';
import {ClientesService} from '../../../services/clientes.service';
import swal from 'sweetalert2';
import {RolModel} from '../roles/rol.model';
import {RolesService} from '../../../services/roles.service';
import {PrestamoModel} from '../prestamos/prestamo.model';
import {PrestamosService} from '../../../services/prestamos.service';
import {AhorroModel} from '../ahorros/ahorro.model';
import {AhorrosService} from '../../../services/ahorros.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ahorros: AhorroModel[];
  prestamos: PrestamoModel[];
  clientes: ClienteModel[];
  roles: RolModel[];

  constructor(private ahorrosService: AhorrosService,
              private prestamosService: PrestamosService,
              private clientesService: ClientesService,
              private rolesService: RolesService) {
  }

  ngOnInit() {
    this.ahorros = new Array();
    this.prestamos = new Array();
    this.clientes = new Array();
    this.roles = new Array();
    this.getAllAhorros();
    this.getAllPrestamos();
    this.getAllClientes();
    this.getAllRoles();
  }

  getAllAhorros() {
    this.ahorrosService.getAll().subscribe(
      response => {
        console.log(response);
        this.ahorros = response;
      },
      (errors) => {
        swal.fire('Ocurrió un error al Obtener los ahorros', errors.message, 'error');
      }
    );
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
