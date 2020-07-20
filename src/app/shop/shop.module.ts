import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module'
import { ModalModule } from './component/modal/modal.module'

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    ModalModule,
  ],
  declarations: [ShopComponent ],
  entryComponents: [],
})
export class ShopModule { }