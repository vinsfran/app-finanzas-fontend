import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../../../../services/auth.service';
import {TarjetaModel} from '../../tarjetas/tarjeta.model';
import {TiposPagosService} from '../../../../services/tiposPagos.service';
import {TipoPagoModel} from '../../tiposPagos/tipoPago.model';
import {TarjetasService} from '../../../../services/tarjetas.service';
import {PageModel} from '../../widgets/page.model';
import {MovimientosService} from '../../../../services/movimientos.service';
import {MovimientoModel} from '../../movimientos/movimiento.model';

@Component({
  selector: 'app-detalles-tarjeta-form',
  templateUrl: './verDetallesTarjeta-form.component.html',
  styleUrls: ['./verDetallesTarjeta-form.component.css']
})
export class VerDetallesTarjetaFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  tarjeta: TarjetaModel;
  tarjetaId: number;

  tarjetas: TarjetaModel[];
  tiposPagos: TipoPagoModel[];
  movimientos: MovimientoModel[];

  campo: string;
  orden: string;
  page: PageModel;

  constructor(private authService: AuthService,
              private movimientosService: MovimientosService,
              private tarjetasService: TarjetasService,
              private tiposPagosService: TiposPagosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.campo = 'id';
    this.orden = 'asc';
    this.tarjeta = new TarjetaModel();
    this.cargarTarjeta();
    this.tiposPagosService.getAll().subscribe(getAll => {
        this.tiposPagos = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.titulo = 'Ver Detalles';
    this.lista = ['Tarjetas Pago'];
    this.lista.push(this.titulo);
  }


  cargarTarjeta(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.tarjetasService.getTarjeta(id)
          .subscribe((tarjetaModel) => {
            this.tarjeta = tarjetaModel;
            this.tarjetaId = this.tarjeta.id;
            this.getMovimientosPageByTarjetaId(0, 10, this.campo, this.orden, this.tarjetaId);
          });
      }
    });
  }

  getMovimientosPageByTarjetaId(page: number, size: number, campo: string, orden: string, tarjetaId: number) {
    this.movimientosService.getMovimientosPageByTarjetaId(page, size, campo, orden, tarjetaId).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.movimientos = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Movimientos', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getMovimientosPageByTarjetaId(0, 10, this.campo, this.orden, this.tarjetaId);
  }

  back() {
    this.router.navigate(['/tarjetas']);
  }


  setEntidadFinancieraId($event) {
    console.log($event);

  }

  onChange(newValue) {
    console.log(newValue);
  }
}
