import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';




import { ProductSharedService } from '../services/productShared.service'
import { UserSharedService } from '../services/userShared.service'
import { User, Product } from '../app.model'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  users: Array<User> = []
  products: Array<Product> = []
  current_idUser: string
  counterBasket: number
  modal: boolean = false
  currentProduct: Product

  constructor(
    private productSharedService: ProductSharedService,
    private userSharedService: UserSharedService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productSharedService.productsShared$.subscribe((arr: Product[]) => this.products = arr);
    this.userSharedService.usersShared$.subscribe((arr: User[]) => this.users = arr);
    this.current_idUser = this.route.snapshot.params.id;
    this.userSharedService.usersShared$.subscribe((arr: User[]) => this.counterBasket = arr.find(item => item._id === this.current_idUser).basket.length)

  }

  handleProductIdChange(product_id: string, product_name: string): void {
    this.userSharedService.addProduct(product_id, this.current_idUser)
    this.toastr.success('added to your cart', product_name)
  }

  handleProductIdChangeModal(value: any): void {
    this.userSharedService.addProduct(value.product_id, this.current_idUser)
  }


  switchesModalTrue(product: Product): void {
    this.currentProduct = product
    this.modal = true
  }

  switchesModalFalse(): void {
    this.modal = false
  }

  exitLogin(): void {
    localStorage.setItem('login', 'false')
    localStorage.setItem('admin', 'false')
    this.router.navigate(['/auth'])
  }

}

