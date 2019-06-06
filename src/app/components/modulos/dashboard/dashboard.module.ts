import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {ClientesService} from '../../../services/clientes.service';
import {RolesService} from '../../../services/roles.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    ClientesService,
    RolesService
  ]
})

export class DashboardModule {
}

