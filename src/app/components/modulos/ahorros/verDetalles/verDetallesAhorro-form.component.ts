import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../../../../services/auth.service';
import {AhorroModel} from '../../ahorros/ahorro.model';
import {TiposPagosService} from '../../../../services/tiposPagos.service';
import {TipoPagoModel} from '../../tiposPagos/tipoPago.model';
import {AhorrosService} from '../../../../services/ahorros.service';
import {PageModel} from '../../widgets/page.model';
import {MovimientosService} from '../../../../services/movimientos.service';
import {MovimientoModel} from '../../movimientos/movimiento.model';

@Component({
  selector: 'app-detalles-ahorro-form',
  templateUrl: './verDetallesAhorro-form.component.html',
  styleUrls: ['./verDetallesAhorro-form.component.css']
})
export class VerDetallesAhorroFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  ahorro: AhorroModel;
  ahorroId: number;

  ahorros: AhorroModel[];
  tiposPagos: TipoPagoModel[];
  movimientos: MovimientoModel[];

  campo: string;
  orden: string;
  page: PageModel;

  constructor(private authService: AuthService,
              private movimientosService: MovimientosService,
              private ahorrosService: AhorrosService,
              private tiposPagosService: TiposPagosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.campo = 'id';
    this.orden = 'asc';
    this.ahorro = new AhorroModel();
    this.cargarAhorro();
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
    this.lista = ['Ahorros Pago'];
    this.lista.push(this.titulo);
  }


  cargarAhorro(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.ahorrosService.getAhorro(id)
          .subscribe((ahorroModel) => {
            this.ahorro = ahorroModel;
            this.ahorroId = this.ahorro.id;
            this.getMovimientosPageByAhorroId(0, 10, this.campo, this.orden, this.ahorroId);
          });
      }
    });
  }

  getMovimientosPageByAhorroId(page: number, size: number, campo: string, orden: string, ahorroId: number) {
    this.movimientosService.getMovimientosPageByAhorroId(page, size, campo, orden, ahorroId).subscribe(
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
    this.getMovimientosPageByAhorroId(0, 10, this.campo, this.orden, this.ahorroId);
  }

  back() {
    this.router.navigate(['/ahorros']);
  }


  setEntidadFinancieraId($event) {
    console.log($event);

  }

  onChange(newValue) {
    console.log(newValue);
  }
}
