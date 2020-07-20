import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { ModalAdminComponent} from './modal-admin/modal-admin.component'

import { ProductSharedService } from '../services/productShared.service'
import { Product } from '../app.model'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  products: Array<Product> = []
  constructor(
    private productSharedService: ProductSharedService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productSharedService.productsShared$.subscribe((arr: Product[]) => this.products = arr)
  }

  openDialog(): void {
    this.dialog.open(ModalAdminComponent);}

  exitLogin(): void {
    localStorage.setItem('login', 'false')
    localStorage.setItem('admin', 'false')
    this.router.navigate(['/auth'])
  }


}
