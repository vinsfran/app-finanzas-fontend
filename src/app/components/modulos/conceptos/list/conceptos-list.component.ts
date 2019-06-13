import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {ConceptosService} from '../../../../services/conceptos.service';
import {AuthService} from '../../../../services/auth.service';
import {ConceptoModel} from '../concepto.model';
import {PageModel} from '../../../../models/new/page.model';

@Component({
  selector: 'app-conceptos-list',
  templateUrl: './conceptos-list.component.html',
  styleUrls: ['./conceptos-list.component.css']
})
export class ConceptosListComponent implements OnInit {

  titulo: string;
  lista: string[];
  conceptos: ConceptoModel[];
  page: PageModel;
  campo: string;
  orden: string;

  inputDeBuscar: string;

  constructor(private conceptosService: ConceptosService, private activatedRoute: ActivatedRoute,
              public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.titulo = 'Lista de Conceptos';
    this.lista = ['Conceptos', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.getConceptos(0, 10, this.campo, this.orden);
  }

  getConceptos(page: number, size: number, campo: string, orden: string) {
    this.conceptosService.getConceptos(page, size, campo, orden).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.conceptos = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Conceptos', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getConceptos(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getConceptos(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  delete(concepto: ConceptoModel): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Concepto Nro ${concepto.id}?`,
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
        this.conceptosService.delete(concepto.id).subscribe(
          response => {
            this.conceptos = this.conceptos.filter(ro => ro !== concepto);
            swal.fire(
              'Concepto Eliminado!',
              `Concepto Nro ${concepto.id} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

  pagar(conceptoModel: ConceptoModel) {
    this.router.navigateByData({
      url: ['/conceptos/pagar'],
      data: [conceptoModel]
    });
  }

  buscar() {
    console.log('Valor en inputDeBuscar: ' + this.inputDeBuscar);
  }
}
