import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {AuthService} from '../../../../services/auth.service';
import {MonedaModel} from '../moneda.model';
import {PageModel} from '../../widgets/page.model';
import {MonedasService} from '../../../../services/monedas.service';

@Component({
  selector: 'app-monedas-list',
  templateUrl: './monedas-list.component.html',
  styleUrls: ['./monedas-list.component.css']
})
export class MonedasListComponent implements OnInit {

  titulo: string;
  lista: string[];
  monedas: MonedaModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private monedasService: MonedasService,
              public authService: AuthService) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Monedas';
    this.lista = ['Monedas', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getMonedas(0, 10, this.campo, this.orden);
  }

  getMonedas(page: number, size: number, campo: string, orden: string) {
    this.monedasService.getPage(page, size, campo, orden).subscribe(
      response => {
        this.page = response.page;
        this.monedas = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar las Monedas', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getMonedas(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getMonedas(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(moneda: MonedaModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la moneda ${moneda.nombre}?`,
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

        this.monedasService.delete(moneda.id).subscribe(
          response => {
            this.monedas = this.monedas.filter(cli => cli !== moneda);
            swal.fire(
              'Moneda Eliminado!',
              `Moneda ${moneda.nombre} eliminada con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
