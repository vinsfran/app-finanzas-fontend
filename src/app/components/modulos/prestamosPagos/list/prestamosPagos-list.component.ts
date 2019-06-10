import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {PrestamosPagosService} from '../../../../services/prestamosPagos.service';
import {AuthService} from '../../../../services/auth.service';
import {PrestamoPagoModel} from '../prestamoPago.model';
import {PageModel} from '../../../../models/new/page.model';

@Component({
  selector: 'app-prestamos-pagos-list',
  templateUrl: './prestamosPagos-list.component.html',
  styleUrls: ['./prestamosPagos-list.component.css']
})
export class PrestamosPagosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  prestamosPagos: PrestamoPagoModel[];
  page: PageModel;
  campo: string;
  orden: string;

  inputDeBuscar: string;

  constructor(private prestamosPagosService: PrestamosPagosService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Prestamos Pagos';
    this.lista = ['Prestamos Pagos', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getPage(0, 10, this.campo, this.orden);
  }

  getPage(page: number, size: number, campo: string, orden: string) {
    this.prestamosPagosService.getPage(page, size, campo, orden).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.prestamosPagos = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Prestamos Pagos', errors.message, 'error');
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

  delete(prestamoPago: PrestamoPagoModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Prestamo Pago Nro ${prestamoPago.id}?`,
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
        this.prestamosPagosService.delete(prestamoPago.id).subscribe(
          response => {
            this.prestamosPagos = this.prestamosPagos.filter(ro => ro !== prestamoPago);
            swal.fire(
              'Prestamo Pago Eliminado!',
              `Prestamo Nro ${prestamoPago.id} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

  buscar() {
    console.log('Valor en inputDeBuscar: ' + this.inputDeBuscar);
  }
}
