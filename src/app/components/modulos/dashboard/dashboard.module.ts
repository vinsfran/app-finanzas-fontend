import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {ClientesService} from '../../../services/clientes.service';
import {RolesService} from '../../../services/roles.service';
import {PrestamosService} from '../../../services/prestamos.service';
import {AhorrosService} from '../../../services/ahorros.service';
import {DashboardService} from '../../../services/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService,
    AhorrosService,
    PrestamosService,
    ClientesService,
    RolesService
  ]
})

export class DashboardModule {
}

