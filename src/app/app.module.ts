import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RoutingModule } from './routing.module'; 

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HomeComponent } from './home/home.component';
import { AddmenuComponent } from './addmenu/addmenu.component';
import { AddrestauarantComponent } from './addrestauarant/addrestauarant.component';
import { RestauarantlistComponent } from './restauarantlist/restauarantlist.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ModalModule } from 'ngx-bootstrap';


var config = {
  apiKey: "AIzaSyBdtYlaHYNjxqrWz_ckQXW8e9G7_o0rEcM",
  authDomain: "order-da4b9.firebaseapp.com",
  databaseURL: "https://order-da4b9.firebaseio.com",
  projectId: "order-da4b9",
  storageBucket: "order-da4b9.appspot.com",
  messagingSenderId: "486609275362"
  // apiKey: "AIzaSyDeaIy5Bo_AeHRLVjqAVli_BqtwSyai2dA",
  // authDomain: "webproject-ac948.firebaseapp.com",
  // databaseURL: "https://webproject-ac948.firebaseio.com",
  // projectId: "webproject-ac948",
  // storageBucket: "webproject-ac948.appspot.com",
  // messagingSenderId: "776286744063"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddmenuComponent,
    AddrestauarantComponent,
    RestauarantlistComponent,
    MenuComponent,
    CartComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RoutingModule, 
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
