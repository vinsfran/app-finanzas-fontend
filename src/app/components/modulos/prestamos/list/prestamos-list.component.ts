import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {PrestamosService} from '../../../../services/prestamos.service';
import {AuthService} from '../../../../services/auth.service';
import {PrestamoModel} from '../prestamo.model';
import {PageModel} from '../../../../models/new/page.model';

@Component({
  selector: 'app-prestamos-list',
  templateUrl: './prestamos-list.component.html',
  styleUrls: ['./prestamos-list.component.css']
})
export class PrestamosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  prestamos: PrestamoModel[];
  page: PageModel;
  campo: string;
  orden: string;

  inputDeBuscar: string;

  constructor(private prestamosService: PrestamosService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Prestamos';
    this.lista = ['Prestamos', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getPrestamos(0, 10, this.campo, this.orden);
  }

  getPrestamos(page: number, size: number, campo: string, orden: string) {
    this.prestamosService.getPrestamos(page, size, campo, orden).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.prestamos = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Prestamos', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getPrestamos(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getPrestamos(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(prestamo: PrestamoModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Prestamo Nro ${prestamo.id}?`,
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

        this.prestamosService.delete(prestamo.id).subscribe(
          response => {
            this.prestamos = this.prestamos.filter(ro => ro !== prestamo);
            swal.fire(
              'Prestamo Eliminado!',
              `Prestamo Nro ${prestamo.id} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

  pagar(prestamoModel: PrestamoModel) {
    this.router.navigateByData({
      url: ['/prestamos/pagar'],
      data: [prestamoModel]
    });
  }

  buscar() {
    console.log('Valor en inputDeBuscar: ' + this.inputDeBuscar);
  }
}
