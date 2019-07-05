import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {TarjetasRoutingModule} from './tarjetas-routing.module';
import {TarjetasComponent} from './tarjetas.component';
import {TarjetasListComponent} from './list/tarjetas-list.component';
import {TarjetasFormComponent} from './form/tarjetas-form.component';
import {AhorrosService} from '../../../services/ahorros.service';
import {EntidadesFinancierasService} from '../../../services/entidadesFinancieras.service';
import {TiposAhorrosService} from '../../../services/tiposAhorros.service';

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
    TarjetasListComponent
  ],
  providers: [
    AhorrosService,
    TiposAhorrosService,
    EntidadesFinancierasService,

  ]
})

export class TarjetasModule {
}
