import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {CreditosService} from '../../../../services/creditos.service';
import {AuthService} from '../../../../services/auth.service';
import {CreditoModel} from '../credito.model';
import {PageModel} from '../../../../models/new/page.model';

@Component({
  selector: 'app-creditos-list',
  templateUrl: './creditos-list.component.html',
  styleUrls: ['./creditos-list.component.css']
})
export class CreditosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  creditos: CreditoModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private creditosService: CreditosService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Creditos';
    this.lista = ['Creditos', this.titulo];
    this.campo = 'nroCredito';
    this.orden = 'asc';
    this.getCreditos(0, 10, this.campo, this.orden);
  }

  getCreditos(page: number, size: number, campo: string, orden: string) {
    this.creditosService.getCreditos(page, size, campo, orden).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.creditos = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Creditos', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getCreditos(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getCreditos(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(creditos: CreditoModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Credito Nro ${creditos.nroCredito}?`,
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

        this.creditosService.delete(creditos.nroCredito).subscribe(
          response => {
            this.creditos = this.creditos.filter(ro => ro !== creditos);
            swal.fire(
              'Credito Eliminado!',
              `Credito Nro ${creditos.nroCredito} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
