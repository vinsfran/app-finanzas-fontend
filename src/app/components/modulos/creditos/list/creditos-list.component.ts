import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {EntidadesFinancierasService} from '../../../../services/entidadesFinancieras.service';
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
  entidadesFinancieras: CreditoModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private entidadesFinancierasService: EntidadesFinancierasService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Entidades Financieras';
    this.lista = ['Entidades Financieras', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getEntidadesFinancieras(0, 10, this.campo, this.orden);
  }

  getEntidadesFinancieras(page: number, size: number, campo: string, orden: string) {
    this.entidadesFinancierasService.getEntidadesFinancieras(page, size, campo, orden).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.entidadesFinancieras = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar las Entidades Financieras', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getEntidadesFinancieras(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getEntidadesFinancieras(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(entidadFinanciera: CreditoModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la Entidad Financiera ${entidadFinanciera.nombre}?`,
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

        this.entidadesFinancierasService.delete(entidadFinanciera.id).subscribe(
          response => {
            this.entidadesFinancieras = this.entidadesFinancieras.filter(ro => ro !== entidadFinanciera);
            swal.fire(
              'Entidad Financiera Eliminada!',
              `Rol ${entidadFinanciera.nombre} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
