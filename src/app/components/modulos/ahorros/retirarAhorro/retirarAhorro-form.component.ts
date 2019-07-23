import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AhorroModel} from '../ahorro.model';
import {AuthService} from '../../../../services/auth.service';
import {AhorrosService} from '../../../../services/ahorros.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-retirar-ahorro-form',
  templateUrl: './retirarAhorro-form.component.html',
  styleUrls: ['./retirarAhorro-form.component.css']
})
export class RetirarAhorroFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  ahorro: AhorroModel;
  ahorroId: number;

  ahorros: AhorroModel[];


  constructor(private authService: AuthService,
              private ahorrosService: AhorrosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.ahorro = new AhorroModel();
    this.cargarAhorro();
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
          });
      }
    });
  }


  back() {
    this.router.navigate(['/ahorros']);
  }

  cobrar() {
    this.ahorro.estado = false;
    this.ahorrosService.update(this.ahorro)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/ahorros']);
          swal.fire(json.mensaje, `Ahorro: ${json.ahorro.nroAhorro}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }
}
