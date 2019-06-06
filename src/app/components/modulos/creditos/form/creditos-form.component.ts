import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {CreditoModel} from '../credito.model';
import {CreditosService} from '../../../../services/creditos.service';

@Component({
  selector: 'app-creditos-form',
  templateUrl: './creditos-form.component.html',
  styleUrls: ['./creditos-form.component.css']
})
export class CreditosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  creditoModel: CreditoModel;

  constructor(private creditosService: CreditosService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.creditoModel = new CreditoModel();
    this.titulo = 'Crear Credito';
    this.cargarCredito();
    this.lista = ['Entidades Financieras'];
    this.lista.push(this.titulo);
  }


  cargarCredito(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Credito Nro: ' + id;
        this.creditosService.getCredito(id)
          .subscribe((creditoModel) => this.creditoModel = creditoModel);
      }
    });
  }

  create(): void {
    this.creditosService.create(this.creditoModel)
      .subscribe(credito => {
          this.router.navigate(['/creditos']);
          swal.fire('Nuevo Credito', `El Credito: ${credito.nombre} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.creditosService.update(this.creditoModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/creditos']);
          swal.fire(json.mensaje, `Credito: ${json.credito.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/creditos']);
  }

}
