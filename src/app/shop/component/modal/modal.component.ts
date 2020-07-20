import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() currentProduct;
  @Output() productIdChange = new EventEmitter<any>();
  @Output() switchesModalFalse = new EventEmitter()
  quantity: number = 1

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addInBasket(product_id, product_name): void {
    if (this.quantity < 2) {
      this.toastr.success('added to your cart', product_name)
    } else {
      this.toastr.success('added to your cart', `${this.quantity} items  ${product_name}`)
    }

    for (let i = 1; i <= this.quantity; i++) {
      this.productIdChange.emit({ product_id, product_name })
    }
  }

  exitModal(): void {
    this.switchesModalFalse.emit()
  }

  addBouquet(): void {
    this.quantity = this.quantity + 1
  }

  subtractBouquet(): void {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1
    }
  }
}
