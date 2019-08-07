import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';
import {LoginModel} from '../../models/login.model';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor Sign In!';
  loginModel: LoginModel;

  constructor(private authService: AuthService, private router: Router) {
    this.loginModel = new LoginModel();
  }

  ngOnInit() {
    document.body.className = 'hold-transition login-page';
    if (this.authService.isAuthenticated()) {
      swal.fire('Login', `Hola ${this.authService.usuario.email}, ya estas autenticado!`, 'info');
      this.router.navigate(['']);
    }
  }

  login(): void {
    if (this.loginModel.email == null || this.loginModel.password == null) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.loginModel).subscribe(response => {
        console.log(response);
        this.authService.guardarUsuario(response.accessToken);
        this.authService.guardarToken(response.accessToken);
        const usuario = this.authService.usuario;
        this.router.navigate(['/']);
        swal.fire('Login', `Hola ${usuario.email}, has iniciado sesión con éxito!`, 'success');
      }, err => {
        if (err.status === 400) {
          swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
    );

  }

}
