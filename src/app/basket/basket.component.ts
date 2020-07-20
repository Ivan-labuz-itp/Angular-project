import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ProductSharedService } from '../services/productShared.service'
import { UserSharedService } from '../services/userShared.service'
import { map, mergeMap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { User, Product } from '../app.model'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  currentUsersBasket: Array<string> = []
  index: number = 0
  products: Array<Product> = []
  users: Array<User> = []
  total: number = 0
  currentIdUser = this.route.snapshot.params.id
  orderMade: boolean = false
  constructor(
    private productSharedService: ProductSharedService,
    private userSharedService: UserSharedService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSharedService.usersShared$.pipe(
      map((users: User[]) => {
        this.currentUsersBasket = users.find(item => item._id === this.currentIdUser).basket
        this.users = users
        return users
      }),
      mergeMap((users: User[]) => this.getProducts(users)),
      map((products: Product[]) => products.map((product: Product) => product.price * product.totalCount).reduce(((a, b) => a + b), 0)
      )
    ).subscribe(allTotal => this.total = allTotal)
  }

  counterProduct(productId: string, users: User[]): number {

    return users && users.find(item => item._id === this.currentIdUser).basket.filter(item => item === productId).length;
  }

  getProducts(users: User[]): Observable<Product[]> {
    return this.productSharedService.productsShared$.pipe(
      map((item: Product[]) => {
        return item
          .map((prod: Product) => {
            if (this.currentUsersBasket.includes(prod._id)) { return prod }
          })
          .filter(item => item != null)
      }),
      map((products: Product[]) => {
        this.products = products.map((item: Product) => {
          item.totalCount = this.counterProduct(item._id, users)
          return item
        })
        return this.products
      })
    )
  }

  addProductsClick(productId: string): void {
    this.userSharedService.addProduct(productId, this.currentIdUser)
  }

  delProductClick(productId: string): void {
    this.userSharedService.delProduct(productId, this.currentIdUser)
  }

  minProductClick(productId: string): void {
    this.userSharedService.minusProduct(productId, this.currentIdUser)
  }

  clearProductClick(): void {
    this.userSharedService.clearProduct(this.currentIdUser)
  }

  orderMadeClick():void {
    this.orderMade = true
    this.userSharedService.clearProduct(this.currentIdUser)
    setTimeout( () => this.router.navigate(['shop/', this.currentIdUser]) , 3000)
  }

  exitLogin(): void {
    localStorage.setItem('login','false')
    localStorage.setItem('admin','false')
    this.router.navigate(['/auth'])
  }

}
