import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioModel} from '../../../models/usuario.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioModel: UsuarioModel;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.usuarioModel = this.authService.usuario;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }


}
