import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../../../../services/auth.service';
import {MovimientoModel} from '../movimiento.model';
import {PageModel} from '../../widgets/page.model';
import {MovimientosService} from '../../../../services/movimientos.service';

@Component({
  selector: 'app-movimientos-list',
  templateUrl: './movimientos-list.component.html',
  styleUrls: ['./movimientos-list.component.css']
})
export class MovimientosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  movimientos: MovimientoModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private movimientosService: MovimientosService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Movimientos';
    this.lista = ['Movimientos', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getMovimientos(0, 10, this.campo, this.orden);
  }

  getMovimientos(page: number, size: number, campo: string, orden: string) {
    this.movimientosService.getPage(page, size, campo, orden).subscribe(
      response => {
        this.page = response.page;
        this.movimientos = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Movimientos', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getMovimientos(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getMovimientos(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(movimiento: MovimientoModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el movimiento ${movimiento.id}?`,
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

        this.movimientosService.delete(movimiento.id).subscribe(
          response => {
            this.movimientos = this.movimientos.filter(cli => cli !== movimiento);
            swal.fire(
              'Movimiento Eliminado!',
              `Movimiento ${movimiento.id} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
