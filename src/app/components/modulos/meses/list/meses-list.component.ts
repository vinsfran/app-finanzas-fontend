import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {AuthService} from '../../../../services/auth.service';
import {MesModel} from '../mes.model';
import {PageModel} from '../../widgets/page.model';
import {MesesService} from '../../../../services/meses.service';

@Component({
  selector: 'app-meses-list',
  templateUrl: './meses-list.component.html',
  styleUrls: ['./meses-list.component.css']
})
export class MesesListComponent implements OnInit {

  titulo: string;
  lista: string[];
  meses: MesModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private mesesService: MesesService,
              public authService: AuthService) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Meses';
    this.lista = ['Meses', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getMeses(0, 10, this.campo, this.orden);
  }

  getMeses(page: number, size: number, campo: string, orden: string) {
    this.mesesService.getPage(page, size, campo, orden).subscribe(
      response => {
        this.page = response.page;
        this.meses = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Meses', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getMeses(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getMeses(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(mes: MesModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el mes ${mes.nombre}?`,
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

        this.mesesService.delete(mes.id).subscribe(
          response => {
            this.meses = this.meses.filter(cli => cli !== mes);
            swal.fire(
              'Mes Eliminado!',
              `Mes ${mes.nombre} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
