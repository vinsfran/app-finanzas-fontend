import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {ConceptoModel} from '../concepto.model';
import {ConceptosService} from '../../../../services/conceptos.service';
import {MonedaModel} from '../../monedas/moneda.model';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-conceptos-form',
  templateUrl: './conceptos-form.component.html',
  styleUrls: ['./conceptos-form.component.css']
})
export class ConceptosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  conceptoModel: ConceptoModel;

  monedas: MonedaModel[];
  monedaModel: MonedaModel;


  constructor(private authService: AuthService,
              private conceptosService: ConceptosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.monedaModel = new MonedaModel();
    this.conceptoModel = new ConceptoModel();
    this.titulo = 'Crear Concepto';
    this.cargarConcepto();
    this.lista = ['Conceptos'];
    this.lista.push(this.titulo);
  }


  cargarConcepto(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Concepto Nro: ' + id;
        this.conceptosService.getConcepto(id)
          .subscribe((conceptoModel) => {
            this.conceptoModel = conceptoModel;
          });
      }
    });
  }

  create(): void {
    this.conceptoModel.usuarioId = this.authService.usuario.id;
    console.log(JSON.stringify(this.conceptoModel).toString());
    this.conceptosService.create(this.conceptoModel)
      .subscribe(concepto => {
          this.router.navigate(['/conceptos']);
          swal.fire('Nuevo Concepto', `El Concepto: ${concepto.id} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.conceptosService.update(this.conceptoModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/conceptos']);
          swal.fire(json.mensaje, `Concepto: ${json.concepto.nroConcepto}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/conceptos']);
  }
}
