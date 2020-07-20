import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './login.guard'
import { AdminGuard } from './admin.guard'


import { Error404Component } from './error404/error404.component'

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'shop/:id',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'basket/:id',
    loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [LoginGuard, AdminGuard]
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
