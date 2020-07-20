import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module'

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';

@NgModule({
  imports: [
    CommonModule,
    BasketRoutingModule,
    SharedModule
  ],
  declarations: [BasketComponent],
})
export class BasketModule { }