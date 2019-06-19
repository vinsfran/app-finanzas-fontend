import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../../../../services/auth.service';
import {TipoAhorroModel} from '../tipoAhorro.model';
import {PageModel} from '../../widgets/page.model';
import {TiposAhorrosService} from '../../../../services/tiposAhorros.service';

@Component({
  selector: 'app-tipos-ahorros-list',
  templateUrl: './tiposAhorros-list.component.html',
  styleUrls: ['./tiposAhorros-list.component.css']
})
export class TiposAhorrosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  tiposAhorros: TipoAhorroModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private tiposAhorrosService: TiposAhorrosService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Tipos de Ahorros';
    this.lista = ['Tipos de Ahorros', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getTiposAhorros(0, 10, this.campo, this.orden);
  }

  getTiposAhorros(page: number, size: number, campo: string, orden: string) {
    this.tiposAhorrosService.getTiposAhorros(page, size, campo, orden).subscribe(
      response => {
        this.page = response.page;
        this.tiposAhorros = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Tipos de Ahorros', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getTiposAhorros(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getTiposAhorros(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(tipoAhorro: TipoAhorroModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Tipo de Ahorro ${tipoAhorro.nombre}?`,
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

        this.tiposAhorrosService.delete(tipoAhorro.id).subscribe(
          response => {
            this.tiposAhorros = this.tiposAhorros.filter(cli => cli !== tipoAhorro);
            swal.fire(
              'Tipo de Ahorro Eliminado!',
              `Tipo de Ahorro ${tipoAhorro.nombre} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
