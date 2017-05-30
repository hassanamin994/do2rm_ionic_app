import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductComments } from './product-comments';

@NgModule({
  declarations: [
    ProductComments,
  ],
  imports: [
    IonicPageModule.forChild(ProductComments),
  ],
  exports: [
    ProductComments
  ]
})
export class ProductCommentsModule {}
