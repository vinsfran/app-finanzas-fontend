import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {PrestamosPagosRoutingModule} from './prestamosPagos-routing.module';
import {PrestamosPagosComponent} from './prestamosPagos.component';
import {PrestamosPagosListComponent} from './list/prestamosPagos-list.component';
import {PrestamosPagosFormComponent} from './form/prestamosPagos-form.component';
import {PrestamosPagosService} from '../../../services/prestamosPagos.service';
import {PrestamosService} from '../../../services/prestamos.service';
import {TiposPagosService} from '../../../services/tiposPagos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    PrestamosPagosRoutingModule
  ],
  declarations: [
    PrestamosPagosComponent,
    PrestamosPagosFormComponent,
    PrestamosPagosListComponent
  ],
  providers: [
    PrestamosPagosService,
    PrestamosService,
    TiposPagosService
  ]
})

export class PrestamosPagosModule {
}
