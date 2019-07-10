import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {TarjetaModel} from '../tarjeta.model';
import {TarjetasService} from '../../../../services/tarjetas.service';
import {MonedaModel} from '../../monedas/moneda.model';
import {MonedasService} from '../../../../services/monedas.service';
import {EntidadFinancieraModel} from '../../entidadesFinancieras/entidadFinanciera.model';
import {EntidadesFinancierasService} from '../../../../services/entidadesFinancieras.service';
import {AuthService} from '../../../../services/auth.service';
import {TipoCobroModel} from '../../tiposCobros/tipoCobro.model';
import {TiposCobrosService} from '../../../../services/tiposCobros.service';

@Component({
  selector: 'app-tarjetas-form',
  templateUrl: './tarjetas-form.component.html',
  styleUrls: ['./tarjetas-form.component.css']
})
export class TarjetasFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  tarjetaModel: TarjetaModel;

  entidadesFinancieras: EntidadFinancieraModel[];


  constructor(private authService: AuthService,
              private tarjetasService: TarjetasService,
              private entidadesFinancierasService: EntidadesFinancierasService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.tarjetaModel = new TarjetaModel();

    this.entidadesFinancierasService.getAll().subscribe(getAll => {
        this.entidadesFinancieras = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.titulo = 'Crear Tarjeta';
    this.cargarTarjeta();
    this.lista = ['Tarjetas'];
    this.lista.push(this.titulo);
  }


  cargarTarjeta(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Tarjeta Nro: ' + id;
        this.tarjetasService.getTarjeta(id)
          .subscribe((tarjetaModel) => {
            this.tarjetaModel = tarjetaModel;
          });
      }
    });
  }

  create(): void {
    this.tarjetaModel.usuarioId = this.authService.usuario.id;
    this.tarjetasService.create(this.tarjetaModel)
      .subscribe(tarjeta => {
          this.router.navigate(['/tarjetas']);
          swal.fire('Nueva Tarjeta', `La Tarjeta: ${tarjeta.id} ha sido creada con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.tarjetasService.update(this.tarjetaModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/tarjetas']);
          swal.fire(json.mensaje, `Tarjeta: ${json.tarjeta.nroTarjeta}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/tarjetas']);
  }
}
