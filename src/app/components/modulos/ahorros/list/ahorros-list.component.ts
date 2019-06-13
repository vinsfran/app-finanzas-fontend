import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AhorrosService} from '../../../../services/ahorros.service';
import {AuthService} from '../../../../services/auth.service';
import {AhorroModel} from '../ahorro.model';
import {PageModel} from '../../../../models/new/page.model';

@Component({
  selector: 'app-ahorros-list',
  templateUrl: './ahorros-list.component.html',
  styleUrls: ['./ahorros-list.component.css']
})
export class AhorrosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  ahorros: AhorroModel[];
  page: PageModel;
  campo: string;
  orden: string;

  inputDeBuscar: string;

  constructor(private ahorrosService: AhorrosService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Ahorros';
    this.lista = ['Ahorros', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getAhorros(0, 10, this.campo, this.orden);
  }

  getAhorros(page: number, size: number, campo: string, orden: string) {
    this.ahorrosService.getAhorros(page, size, campo, orden).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.ahorros = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Ahorros', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getAhorros(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getAhorros(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(ahorro: AhorroModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Ahorro Nro ${ahorro.id}?`,
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
        this.ahorrosService.delete(ahorro.id).subscribe(
          response => {
            this.ahorros = this.ahorros.filter(ro => ro !== ahorro);
            swal.fire(
              'Ahorro Eliminado!',
              `Ahorro Nro ${ahorro.id} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

  pagar(ahorroModel: AhorroModel) {
    this.router.navigateByData({
      url: ['/ahorros/pagar'],
      data: [ahorroModel]
    });
  }

  buscar() {
    console.log('Valor en inputDeBuscar: ' + this.inputDeBuscar);
  }
}
