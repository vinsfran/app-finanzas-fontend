import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {PrestamosPagosService} from '../../../../services/prestamosPagos.service';
import {AuthService} from '../../../../services/auth.service';
import {PrestamoModel} from '../../prestamos/prestamo.model';
import {TiposPagosService} from '../../../../services/tiposPagos.service';
import {TipoPagoModel} from '../../tiposPagos/tipoPago.model';
import {PrestamoPagoModel} from '../../prestamosPagos/prestamoPago.model';

@Component({
  selector: 'app-realizar-pago-prestamo-form',
  templateUrl: './realizarPagoPrestamo-form.component.html',
  styleUrls: ['./realizarPagoPrestamo-form.component.css']
})
export class RealizarPagoPrestamoFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  prestamo: PrestamoModel;
  prestamoPagoModel: PrestamoPagoModel;

  prestamos: PrestamoModel[];
  tiposPagos: TipoPagoModel[];


  constructor(private authService: AuthService,
              private prestamosPagosService: PrestamosPagosService,
              private tiposPagosService: TiposPagosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.prestamo = new PrestamoModel();
    const datosRetorno = this.router.getNavigatedData();
    this.prestamo = datosRetorno[0];
    console.log(this.prestamo.destinoPrestamo);
    this.prestamoPagoModel = new PrestamoPagoModel();

    this.tiposPagosService.getAll().subscribe(getAll => {
        this.tiposPagos = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.titulo = 'Realizar Pago';
    this.cargar();
    this.lista = ['Prestamos Pago'];
    this.lista.push(this.titulo);
  }


  cargar(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Prestamo Pago Nro: ' + id;
        this.prestamosPagosService.get(id)
          .subscribe((prestamoPagoModel) => {
            this.prestamoPagoModel = prestamoPagoModel;
          });
      }
    });
  }

  create(): void {
    this.prestamoPagoModel.usuarioId = this.authService.usuario.id;
    this.prestamoPagoModel.prestamoId = this.prestamo.id;
    this.prestamoPagoModel.numeroCuota = this.prestamo.cantidadCuotasPagadas + 1;
    console.log(JSON.stringify(this.prestamoPagoModel).toString());
    this.prestamosPagosService.create(this.prestamoPagoModel)
      .subscribe(prestamoPago => {
          this.prestamoPagoModel = prestamoPago;
          this.router.navigate(['/prestamos-pagos']);
          swal.fire('Nuevo Prestamo', `El Prestamo Pago: ${this.prestamoPagoModel.id} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.prestamosPagosService.update(this.prestamoPagoModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/prestamos-pagos']);
          swal.fire(json.mensaje, `Prestamo Pago: ${json.prestamo.nroPrestamo}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/prestamos']);
  }


  setEntidadFinancieraId($event) {
    console.log($event);

  }

  onChange(newValue) {
    console.log(newValue);
  }
}
