import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddmenuComponent } from './addmenu/addmenu.component';
import { AddrestauarantComponent } from './addrestauarant/addrestauarant.component';
import { RestauarantlistComponent } from './restauarantlist/restauarantlist.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: '', component: LoginComponent},
    { path: 'addmenu', component: AddmenuComponent},
    { path: 'addrestauarant', component: AddrestauarantComponent},
    { path: 'abc', component: RestauarantlistComponent},
    { path: 'menu/:id', component: MenuComponent},
    { path: 'cart', component: RestauarantlistComponent},
    { path: 'orders', component: OrderComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
      RouterModule
   ] 
})
export class RoutingModule { };