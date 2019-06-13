import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../../../../services/auth.service';
import {TipoCobroModel} from '../tipoCobro.model';
import {PageModel} from '../../../../models/new/page.model';
import {TiposCobrosService} from '../../../../services/tiposCobros.service';

@Component({
  selector: 'app-tipos-cobros-list',
  templateUrl: './tiposCobros-list.component.html',
  styleUrls: ['./tiposCobros-list.component.css']
})
export class TiposCobrosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  tiposCobros: TipoCobroModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private tiposCobrosService: TiposCobrosService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Tipos de Cobros';
    this.lista = ['Tipos de Cobros', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getTiposCobros(0, 10, this.campo, this.orden);
  }

  getTiposCobros(page: number, size: number, campo: string, orden: string) {
    this.tiposCobrosService.getTiposCobros(page, size, campo, orden).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.tiposCobros = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Tipos de Cobros', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getTiposCobros(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getTiposCobros(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(tipoCobro: TipoCobroModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Tipo de Cobro ${tipoCobro.nombre}?`,
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

        this.tiposCobrosService.delete(tipoCobro.id).subscribe(
          response => {
            this.tiposCobros = this.tiposCobros.filter(cli => cli !== tipoCobro);
            swal.fire(
              'Tipo de Cobro Eliminado!',
              `Tipo de Cobro ${tipoCobro.nombre} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
