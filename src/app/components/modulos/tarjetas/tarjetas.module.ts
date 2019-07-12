import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {TarjetasRoutingModule} from './tarjetas-routing.module';
import {TarjetasComponent} from './tarjetas.component';
import {TarjetasListComponent} from './list/tarjetas-list.component';
import {TarjetasFormComponent} from './form/tarjetas-form.component';
import {TarjetasService} from '../../../services/tarjetas.service';
import {EntidadesFinancierasService} from '../../../services/entidadesFinancieras.service';
import {MovimientosService} from '../../../services/movimientos.service';
import {VerDetallesTarjetaFormComponent} from './verDetalles/verDetallesTarjeta-form.component';
import {TiposPagosService} from '../../../services/tiposPagos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    TarjetasRoutingModule
  ],
  declarations: [
    TarjetasComponent,
    TarjetasFormComponent,
    TarjetasListComponent,
    VerDetallesTarjetaFormComponent
  ],
  providers: [
    TarjetasService,
    EntidadesFinancierasService,
    MovimientosService,
    TiposPagosService
  ]
})

export class TarjetasModule {
}
