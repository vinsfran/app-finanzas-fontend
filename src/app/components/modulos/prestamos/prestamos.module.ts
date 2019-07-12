import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {PrestamosRoutingModule} from './prestamos-routing.module';
import {PrestamosComponent} from './prestamos.component';
import {PrestamosListComponent} from './list/prestamos-list.component';
import {PrestamosFormComponent} from './form/prestamos-form.component';
import {PrestamosService} from '../../../services/prestamos.service';
import {MonedasService} from '../../../services/monedas.service';
import {EntidadesFinancierasService} from '../../../services/entidadesFinancieras.service';
import {RealizarPagoPrestamoFormComponent} from './realizarPagoPrestamo/realizarPagoPrestamo-form.component';
import {TiposPagosService} from '../../../services/tiposPagos.service';
import {VerDetallesPrestamoFormComponent} from './verDetalles/verDetallesPrestamo-form.component';
import {MovimientosService} from '../../../services/movimientos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    PrestamosRoutingModule
  ],
  declarations: [
    PrestamosComponent,
    PrestamosFormComponent,
    PrestamosListComponent,
    RealizarPagoPrestamoFormComponent,
    VerDetallesPrestamoFormComponent
  ],
  providers: [
    PrestamosService,
    EntidadesFinancierasService,
    MonedasService,
    MovimientosService,
    TiposPagosService
  ]
})

export class PrestamosModule {
}
