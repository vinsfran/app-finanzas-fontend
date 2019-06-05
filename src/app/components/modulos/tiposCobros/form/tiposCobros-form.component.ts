import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {TipoCobroModel} from '../tipoCobro.model';
import {TiposCobrosService} from '../../../../services/tiposCobros.service';

@Component({
  selector: 'app-tipos-cobros-form',
  templateUrl: './tiposCobros-form.component.html',
  styleUrls: ['./tiposCobros-form.component.css']
})
export class TiposCobrosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];
  tipoCobroModel: TipoCobroModel;

  constructor(private tiposCobrosService: TiposCobrosService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.tipoCobroModel = new TipoCobroModel();
    this.titulo = 'Crear Tipo de Cobro';
    this.cargarTipoCobro();
    this.lista = ['Tipos de Cobros'];
    this.lista.push(this.titulo);
  }

  cargarTipoCobro(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Tipo de Cobro Nro: ' + id;
        this.tiposCobrosService.getTipoCobro(id).subscribe((tipoCobroModel) => this.tipoCobroModel = tipoCobroModel);
      }
    });
  }

  create(): void {
    this.tiposCobrosService.create(this.tipoCobroModel)
      .subscribe(tipoCobro => {
          this.router.navigate(['/tipos-cobros']);
          swal.fire('Nuevo Tipo de Cobro', `El Tipo de Cobro: ${tipoCobro.descripcion} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.tiposCobrosService.update(this.tipoCobroModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/tipos-cobros']);
          swal.fire(json.mensaje, `Tipo de Cobro: ${json.tipoCobro.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/tipos-cobros']);
  }

}
