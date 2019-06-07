import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {CreditosRoutingModule} from './creditos-routing.module';
import {CreditosComponent} from './creditos.component';
import {CreditosListComponent} from './list/creditos-list.component';
import {CreditosFormComponent} from './form/creditos-form.component';
import {CreditosService} from '../../../services/creditos.service';
import {MonedasService} from '../../../services/monedas.service';
import {EntidadesFinancierasService} from '../../../services/entidadesFinancieras.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    CreditosRoutingModule
  ],
  declarations: [
    CreditosComponent,
    CreditosFormComponent,
    CreditosListComponent
  ],
  providers: [
    CreditosService,
    EntidadesFinancierasService,
    MonedasService
  ]
})

export class CreditosModule {
}
