import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {TipoPagoModel} from '../tipoPago.model';
import {TiposPagosService} from '../../../../services/tiposPagos.service';

@Component({
  selector: 'app-tipos-pagos-form',
  templateUrl: './tiposPagos-form.component.html',
  styleUrls: ['./tiposPagos-form.component.css']
})
export class TiposPagosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];
  tipoPagoModel: TipoPagoModel;

  constructor(private tiposPagosService: TiposPagosService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.tipoPagoModel = new TipoPagoModel();
    this.titulo = 'Crear Tipo de Pago';
    this.cargarTipoPago();
    this.lista = ['Tipos de Pagos'];
    this.lista.push(this.titulo);
  }

  cargarTipoPago(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Tipo de Pago Nro: ' + id;
        this.tiposPagosService.getTipoPago(id).subscribe((tipoPagoModel) => this.tipoPagoModel = tipoPagoModel);
      }
    });
  }

  create(): void {
    this.tiposPagosService.create(this.tipoPagoModel)
      .subscribe(tipoPago => {
          this.router.navigate(['/tipos-pagos']);
          swal.fire('Nuevo Tipo de Pago', `El Tipo de Pago: ${tipoPago.nombre} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.tiposPagosService.update(this.tipoPagoModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/tipos-pagos']);
          swal.fire(json.mensaje, `Tipo de Pago: ${json.tipoPago.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/tipos-pagos']);
  }

}
