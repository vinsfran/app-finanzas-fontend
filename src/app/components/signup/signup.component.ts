import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';
import {LoginModel} from '../login/login.model';
import {SignupModel} from './signup.model';

declare var $;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  titulo: string = 'Por favor Sign In!';
  signupModel: SignupModel;

  constructor(private authService: AuthService, private router: Router) {
    this.signupModel = new SignupModel();
  }

  ngOnInit() {
    document.body.className = 'hold-transition login-page';
    if (this.authService.isAuthenticated()) {
      swal.fire('Registro', `Hola ${this.authService.usuario.email}, ya estas autenticado!`, 'info');
      this.router.navigate(['']);
    }
  }

  signup(): void {
    if (this.signupModel.name == null || this.signupModel.email == null || this.signupModel.password == null) {
      swal.fire('Error en Registro', 'Nombre o Email o password vacías!', 'error');
      return;
    }

    this.authService.signup(this.signupModel).subscribe(response => {
        console.log('signup: ' + response);
        this.router.navigate(['login']);
        swal.fire('Registro', `Hola ${this.signupModel.email}, registrado con éxito!`, 'success');
      }, err => {
        if (err.status === 400) {
          swal.fire('Error Registro', 'Nombre o Email o clave incorrectas!', 'error');
        }
      }
    );

  }

}
