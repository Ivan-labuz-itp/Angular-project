import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductSharedService } from '../../services/productShared.service'

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.component.html',
  styleUrls: ['./modal-admin.component.scss']
})
export class ModalAdminComponent implements OnInit {

  addProductForm: FormGroup = new FormGroup({
    "nameProduct": new FormControl("", [
      Validators.required,
    ]),
    "pictureProduct": new FormControl("", [
      Validators.required,
    ]),
    "priceProduct": new FormControl("", [
      Validators.required
    ]),
    "textProduct": new FormControl("", [])
  })

  constructor(private productSharedService: ProductSharedService) { }
  ngOnInit(): void {
  }

  submitProduct() {
    console.log(this.addProductForm.value)
    if (this.addProductForm.valid) {
      let obj
      if (this.addProductForm.value.textProduct) {
        obj = {
          name: this.addProductForm.value.nameProduct,
          url: this.addProductForm.value.pictureProduct,
          price: this.addProductForm.value.priceProduct,
          text: this.addProductForm.value.textProduct,
        }
      } else {
        obj = {
          name: this.addProductForm.value.nameProduct,
          url: this.addProductForm.value.pictureProduct,
          price: this.addProductForm.value.priceProduct,
        }
      }
      this.productSharedService.addProduct(obj)

    }
  }
}
