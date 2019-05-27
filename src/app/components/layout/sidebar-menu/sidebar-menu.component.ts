import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UsuarioModel} from '../../../models/usuario.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  usuarioModel: UsuarioModel;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.usuarioModel = this.authService.usuario;
  }


}
