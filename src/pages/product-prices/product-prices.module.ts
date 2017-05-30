import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPrices } from './product-prices';

@NgModule({
  declarations: [
    ProductPrices,
  ],
  imports: [
    IonicPageModule.forChild(ProductPrices),
  ],
  exports: [
    ProductPrices
  ]
})
export class ProductPricesModule {}
