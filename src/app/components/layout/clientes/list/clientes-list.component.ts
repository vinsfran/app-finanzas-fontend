import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {ClientesService} from '../../../../services/clientes.service';
import {AuthService} from '../../../../services/auth.service';
import {ClienteModel} from '../cliente.model';
import {PageModel} from '../../../../models/new/page.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  titulo: string;
  lista: string[];

  clientes: ClienteModel[];
  page: PageModel;


  campo: string;
  orden: string;
  btnVerSubMenu: boolean;
  btnVolver: boolean;

  constructor(private clientesService: ClientesService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Clientes';
    this.lista = ['Clientes', this.titulo];


    this.campo = 'id';
    this.orden = 'asc';
    this.getClientes(0, 10, this.campo, this.orden);
  }

  getClientes(page: number, size: number, campo: string, orden: string) {
    this.clientesService.getClientes(page, size, campo, orden).subscribe(
      res => {
        console.log(res);
        if (res.status) {
          this.page = res.page;
          this.clientes = this.page.content;
        } else {
          swal.fire('Ocurrió un problema al listar los Menus', res.message, 'warning');
        }
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Menus', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getClientes(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getClientes(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }


  // nuevo() {
  //   this.router.navigateByData({
  //     url: ['/menu-informatica/panel-de-control/menu-lateral/form-new'],
  //     data: [this.menuSeleccionado]
  //   });
  // }
  //
  // edit(menuEdit: MenuFormModel) {
  //   this.router.navigateByData({
  //     url: ['/menu-informatica/panel-de-control/menu-lateral/form-edit'],
  //     data: [menuEdit, this.menuSeleccionado]
  //   });
  // }
}
