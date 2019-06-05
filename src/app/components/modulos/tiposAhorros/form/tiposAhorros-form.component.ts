import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {TipoAhorroModel} from '../tipoAhorro.model';
import {TiposAhorrosService} from '../../../../services/tiposAhorros.service';

@Component({
  selector: 'app-tipos-ahorros-form',
  templateUrl: './tiposAhorros-form.component.html',
  styleUrls: ['./tiposAhorros-form.component.css']
})
export class TiposAhorrosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];
  tipoAhorroModel: TipoAhorroModel;

  constructor(private tiposAhorrosService: TiposAhorrosService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.tipoAhorroModel = new TipoAhorroModel();
    this.titulo = 'Crear Tipo de Ahorro';
    this.cargarTipoAhorro();
    this.lista = ['Tipos de Ahorros'];
    this.lista.push(this.titulo);
  }

  cargarTipoAhorro(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Tipo de Ahorro Nro: ' + id;
        this.tiposAhorrosService.getTipoAhorro(id).subscribe((tipoAhorroModel) => this.tipoAhorroModel = tipoAhorroModel);
      }
    });
  }

  create(): void {
    this.tiposAhorrosService.create(this.tipoAhorroModel)
      .subscribe(tipoAhorro => {
          this.router.navigate(['/tipos-ahorros']);
          swal.fire('Nuevo Tipo de Ahorro', `El Tipo de Ahorro: ${tipoAhorro.descripcion} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.tiposAhorrosService.update(this.tipoAhorroModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/tipos-ahorros']);
          swal.fire(json.mensaje, `Tipo de Ahorro: ${json.tipoAhorro.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/tipos-ahorros']);
  }

}
