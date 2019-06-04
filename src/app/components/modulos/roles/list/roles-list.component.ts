import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {RolesService} from '../../../../services/roles.service';
import {AuthService} from '../../../../services/auth.service';
import {RolModel} from '../rol.model';
import {PageModel} from '../../../../models/new/page.model';

@Component({
  selector: 'app-rol-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  titulo: string;
  lista: string[];
  roles: RolModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private rolesService: RolesService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Roles';
    this.lista = ['Roles', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getRoles(0, 10, this.campo, this.orden);
  }

  getRoles(page: number, size: number, campo: string, orden: string) {
    this.rolesService.getRoles(page, size, campo, orden).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.roles = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Roles', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getRoles(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getRoles(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(rol: RolModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al rol ${rol.nombre}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.rolesService.delete(rol.id).subscribe(
          response => {
            this.roles = this.roles.filter(ro => ro !== rol);
            swal.fire(
              'Rol Eliminado!',
              `Rol ${rol.nombre} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
