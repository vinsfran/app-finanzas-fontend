import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {EntidadFinancieraModel} from '../entidadFinanciera.model';
import {EntidadesFinancierasService} from '../../../../services/entidadesFinancieras.service';

@Component({
  selector: 'app-entidades-financieras-form',
  templateUrl: './entidadesFinancieras-form.component.html',
  styleUrls: ['./entidadesFinancieras-form.component.css']
})
export class EntidadesFinancierasFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  entidadFinancieraModel: EntidadFinancieraModel;

  constructor(private entidadesFinancierasService: EntidadesFinancierasService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.entidadFinancieraModel = new EntidadFinancieraModel();
    this.titulo = 'Crear Entidad Financiera';
    this.cargarEntidadFinanciera();
    this.lista = ['Entidades Financieras'];
    this.lista.push(this.titulo);
  }


  cargarEntidadFinanciera(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Entidad Financiera Nro: ' + id;
        this.entidadesFinancierasService.getEntidadFinanciera(id)
          .subscribe((entidadFinancieraModel) => this.entidadFinancieraModel = entidadFinancieraModel);
      }
    });
  }

  create(): void {
    this.entidadesFinancierasService.create(this.entidadFinancieraModel)
      .subscribe(entidadFinanciera => {
          this.router.navigate(['/entidades-financieras']);
          swal.fire('Nueva Entidad Financiera', `La Entidad Financiera: ${entidadFinanciera.nombre} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.entidadesFinancierasService.update(this.entidadFinancieraModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/entidades-financieras']);
          swal.fire(json.mensaje, `Entidad Financiera: ${json.entidadFinanciera.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/entidades-financieras']);
  }

}
