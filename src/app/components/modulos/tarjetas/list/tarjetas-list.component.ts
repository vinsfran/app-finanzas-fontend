import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {TarjetasService} from '../../../../services/tarjetas.service';
import {AuthService} from '../../../../services/auth.service';
import {TarjetaModel} from '../tarjeta.model';
import {PageModel} from '../../widgets/page.model';

@Component({
  selector: 'app-tarjetas-list',
  templateUrl: './tarjetas-list.component.html',
  styleUrls: ['./tarjetas-list.component.css']
})
export class TarjetasListComponent implements OnInit {

  titulo: string;
  lista: string[];
  tarjetas: TarjetaModel[];
  page: PageModel;
  campo: string;
  orden: string;

  inputDeBuscar: string;

  constructor(private tarjetasService: TarjetasService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Tarjetas';
    this.lista = ['Tarjetas', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getTarjetas(0, 10, this.campo, this.orden);
  }

  getTarjetas(page: number, size: number, campo: string, orden: string) {
    this.tarjetasService.getTarjetas(page, size, campo, orden).subscribe(
      response => {
        this.page = response.page;
        this.tarjetas = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Tarjetas', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getTarjetas(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getTarjetas(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(tarjeta: TarjetaModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Tarjeta Nro ${tarjeta.id}?`,
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
        this.tarjetasService.delete(tarjeta.id).subscribe(
          response => {
            this.tarjetas = this.tarjetas.filter(ro => ro !== tarjeta);
            swal.fire(
              'Tarjeta Eliminado!',
              `Tarjeta Nro ${tarjeta.id} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

  pagar(tarjetaModel: TarjetaModel) {
    this.router.navigateByData({
      url: ['/tarjetas/pagar'],
      data: [tarjetaModel]
    });
  }

  buscar() {
    console.log('Valor en inputDeBuscar: ' + this.inputDeBuscar);
  }
}
