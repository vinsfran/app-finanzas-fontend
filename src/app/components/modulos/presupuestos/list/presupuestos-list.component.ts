import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../../../../services/auth.service';
import {PresupuestoModel} from '../presupuesto.model';
import {PageModel} from '../../widgets/page.model';
import {PresupuestosService} from '../../../../services/presupuestos.service';

@Component({
  selector: 'app-presupuestos-list',
  templateUrl: './presupuestos-list.component.html',
  styleUrls: ['./presupuestos-list.component.css']
})
export class PresupuestosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  presupuestos: PresupuestoModel[];
  page: PageModel;
  campo: string;
  orden: string;

  constructor(private presupuestosService: PresupuestosService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Presupuestos';
    this.lista = ['Presupuestos', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getPresupuestos(0, 10, this.campo, this.orden);
  }

  getPresupuestos(page: number, size: number, campo: string, orden: string) {
    this.presupuestosService.getPage(page, size, campo, orden).subscribe(
      response => {
        this.page = response.page;
        this.presupuestos = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Presupuestos', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getPresupuestos(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getPresupuestos(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(presupuesto: PresupuestoModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el presupuesto ${presupuesto.id}?`,
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

        this.presupuestosService.delete(presupuesto.id).subscribe(
          response => {
            this.presupuestos = this.presupuestos.filter(cli => cli !== presupuesto);
            swal.fire(
              'Presupuesto Eliminado!',
              `Presupuesto ${presupuesto.id} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }
}
