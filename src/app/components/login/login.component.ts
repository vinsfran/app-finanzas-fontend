import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {UsuarioModel} from '../../models/usuario.model';
import {AuthService} from '../../services/auth.service';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor Sign In!';
  usuario: UsuarioModel;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
    document.body.className = 'hold-transition login-page';
    if (this.authService.isAuthenticated()) {
      swal.fire('Login', `Hola ${this.authService.usuario.username}, ya estas autenticado!`, 'info');
      this.router.navigate(['']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
        console.log(response);
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        const usuario = this.authService.usuario;
        this.router.navigate(['']);
        swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
      }, err => {
        if (err.status === 400) {
          swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
    );

  }

}
