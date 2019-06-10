import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../../../../services/auth.service';
import {TipoPagoModel} from '../tipoPago.model';
import {PageModel} from '../../../../models/new/page.model';
import {TiposPagosService} from '../../../../services/tiposPagos.service';

@Component({
  selector: 'app-tipos-pagos-list',
  templateUrl: './tiposPagos-list.component.html',
  styleUrls: ['./tiposPagos-list.component.css']
})
export class TiposPagosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  tiposPagos: TipoPagoModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private tiposPagosService: TiposPagosService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Tipos de Pagos';
    this.lista = ['Tipos de Pagos', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getPage(0, 10, this.campo, this.orden);
  }

  getPage(page: number, size: number, campo: string, orden: string) {
    this.tiposPagosService.getPage(page, size, campo, orden).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.tiposPagos = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Tipos de Pagos', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getPage(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getPage(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(tipoPago: TipoPagoModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Tipo de Pago ${tipoPago.nombre}?`,
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

        this.tiposPagosService.delete(tipoPago.id).subscribe(
          response => {
            this.tiposPagos = this.tiposPagos.filter(cli => cli !== tipoPago);
            swal.fire(
              'Tipo de Pago Eliminado!',
              `Tipo de Pago ${tipoPago.nombre} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
