import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {MovimientosRoutingModule} from './movimientos-routing.module';
import {MovimientosComponent} from './movimientos.component';
import {MovimientosListComponent} from './list/movimientos-list.component';
import {MovimientosFormComponent} from './form/movimientos-form.component';
import {MovimientosService} from '../../../services/movimientos.service';
import {ConceptosService} from '../../../services/conceptos.service';
import {MonedasService} from '../../../services/monedas.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    MovimientosRoutingModule
  ],
  declarations: [
    MovimientosComponent,
    MovimientosFormComponent,
    MovimientosListComponent
  ],
  providers: [
    MovimientosService,
    ConceptosService,
    MonedasService
  ]
})

export class MovimientosModule {
}
