import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {PresupuestosRoutingModule} from './presupuestos-routing.module';
import {PresupuestosComponent} from './presupuestos.component';
import {PresupuestosListComponent} from './list/presupuestos-list.component';
import {PresupuestosFormComponent} from './form/presupuestos-form.component';
import {PresupuestosService} from '../../../services/presupuestos.service';
import {MonedasService} from '../../../services/monedas.service';
import {MesesService} from '../../../services/meses.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    PresupuestosRoutingModule
  ],
  declarations: [
    PresupuestosComponent,
    PresupuestosFormComponent,
    PresupuestosListComponent
  ],
  providers: [
    PresupuestosService,
    MesesService,
    MonedasService
  ]
})

export class PresupuestosModule {
}
