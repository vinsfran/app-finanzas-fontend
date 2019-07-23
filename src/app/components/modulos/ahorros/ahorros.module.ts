import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {AhorrosRoutingModule} from './ahorros-routing.module';
import {AhorrosComponent} from './ahorros.component';
import {AhorrosListComponent} from './list/ahorros-list.component';
import {AhorrosFormComponent} from './form/ahorros-form.component';
import {AhorrosService} from '../../../services/ahorros.service';
import {MonedasService} from '../../../services/monedas.service';
import {EntidadesFinancierasService} from '../../../services/entidadesFinancieras.service';
import {TiposPagosService} from '../../../services/tiposPagos.service';
import {VerDetallesAhorroFormComponent} from './verDetalles/verDetallesAhorro-form.component';
import {TiposAhorrosService} from '../../../services/tiposAhorros.service';
import {TiposCobrosService} from '../../../services/tiposCobros.service';
import {MovimientosService} from '../../../services/movimientos.service';
import {RetirarAhorroFormComponent} from './retirarAhorro/retirarAhorro-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    AhorrosRoutingModule
  ],
  declarations: [
    AhorrosComponent,
    AhorrosFormComponent,
    AhorrosListComponent,
    RetirarAhorroFormComponent,
    VerDetallesAhorroFormComponent
  ],
  providers: [
    AhorrosService,
    MovimientosService,
    TiposAhorrosService,
    TiposCobrosService,
    EntidadesFinancierasService,
    MonedasService,
    TiposPagosService
  ]
})

export class AhorrosModule {
}
