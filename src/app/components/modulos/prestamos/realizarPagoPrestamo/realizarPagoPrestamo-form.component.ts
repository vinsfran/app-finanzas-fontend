import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {PrestamosPagosService} from '../../../../services/prestamosPagos.service';
import {AuthService} from '../../../../services/auth.service';
import {PrestamoModel} from '../../prestamos/prestamo.model';
import {TiposPagosService} from '../../../../services/tiposPagos.service';
import {TipoPagoModel} from '../../tiposPagos/tipoPago.model';
import {PrestamoPagoModel} from '../../prestamosPagos/prestamoPago.model';
import {PrestamosService} from '../../../../services/prestamos.service';
import {DatePipe} from '@angular/common';

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
  dateString: string;

  constructor(private authService: AuthService,
              private prestamosPagosService: PrestamosPagosService,
              private prestamosService: PrestamosService,
              private tiposPagosService: TiposPagosService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe) {
  }

  ngOnInit() {

    this.dateString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.prestamo = new PrestamoModel();
    this.cargarPrestamo();

    // const datosRetorno = this.router.getNavigatedData();
    // this.prestamo = datosRetorno[0];
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
    this.lista = ['Prestamos Pago'];
    this.lista.push(this.titulo);
  }


  cargarPrestamo(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.prestamosService.getPrestamo(id)
          .subscribe((prestamoModel) => {
            this.prestamo = prestamoModel;
            this.prestamoPagoModel.montoPagado = this.prestamo.montoCuota;
            this.prestamoPagoModel.fechaPago = new Date();
            console.log('ENTRA: ' + this.prestamoPagoModel.fechaPago);
            console.log('ENTRA2: ' + this.dateString);
          });
      }
    });
  }

  // cargar(): void {
  //   this.activatedRoute.params.subscribe(params => {
  //     const id = params['id'];
  //     if (id) {
  //       this.titulo = 'Editar Prestamo Pago Nro: ' + id;
  //       this.prestamosPagosService.get(id)
  //         .subscribe((prestamoPagoModel) => {
  //           this.prestamoPagoModel = prestamoPagoModel;
  //         });
  //     }
  //   });
  // }

  create(): void {
    this.prestamoPagoModel.usuarioId = this.authService.usuario.id;
    this.prestamoPagoModel.prestamoId = this.prestamo.id;
    this.prestamoPagoModel.numeroCuota = this.prestamo.cantidadCuotasPagadas + 1;
    this.prestamosPagosService.create(this.prestamoPagoModel)
      .subscribe(prestamoPago => {
          this.prestamoPagoModel = prestamoPago;
          this.router.navigate(['/prestamos']);
          swal.fire('Prestamo Pagado', `La cuota: ${this.prestamoPagoModel.numeroCuota} ha sido ingresada con exito`, 'success');
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
