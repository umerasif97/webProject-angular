import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { CartService } from '../cart/cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit {
  modalRef: BsModalRef;
  cart: AngularFireList<any>;
  totalCartBill;
  mcart;
  id;
  user;
  constructor(public db: AngularFireDatabase,
    private cartService: CartService,
    private router: Router,
    private modalService: BsModalService, ) {
    this.cart = db.list('/cart');
    this.id = firebase.auth().currentUser.uid;
    console.log(this.id);
  }

  ngOnInit() {
    this.mcart = this.cartService.getCart();
    // this.cart = this.cartService.getCart();
    this.totalCartBill = this.cartService.totalBill();
    this.getUser();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getUser() {
    firebase.database().ref('/users').orderByChild('id').equalTo(this.id).on('value', (snapshot) => {
      console.log(snapshot.val());
      let filter;
      filter = (snapshot.val());
      for (var id in filter) {
        filter[id]['key'] = id;
        this.user = filter[id]
      }
      console.log(this.user);
    });
  }

  menu() {
    this.router.navigate(['restauarants'])
  }

  addToCart(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice) {
    this.cart.push([{
      resturantId: resturantId,
      resturantName: resturantName,
      dishes: [{
        dishId: dishId,
        dishName: dishName,
        dishPrice: dishPrice,
        dishQuantity: dishQuantity
      }]
    }]);
    // this.cartService.addItem(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice);
    // this.totalCartBill = this.cartService.totalBill();
    //console.log(dishQuantity);
  }

  increase(resturantId, dishId) {
    this.cartService.increaseQty(resturantId, dishId);
    this.totalCartBill = this.cartService.totalBill();
    //console.log(resturantId, dishId);
  }
  decrease(resturantId, dishId) {
    this.cartService.decreaseQty(resturantId, dishId);
    this.totalCartBill = this.cartService.totalBill();
  }

  removeDishFromCart(resturantId, dishId) {
    this.cartService.removeItem(resturantId, dishId);
    this.totalCartBill = this.cartService.totalBill();
  }

  removeResturantFromCart(resturantId) {
    this.cartService.removeResturant(resturantId);
    this.totalCartBill = this.cartService.totalBill();
    //console.log(resturantId);
  }

  orderRequest() {
    //this.mcart['TotalBill'] = this.totalCartBill;
    //console.log(this.mcart);
    this.cart.push({
      orderName: this.user['name'],
      orderPhoneNumber: this.user['phoneNumber'],
      orderAddress: this.user['address'],
      totalBill: this.totalCartBill,
      order: this.mcart
    });
    this.mcart = [];
    this.totalCartBill = 0;
    localStorage.setItem('cart', JSON.stringify(this.mcart));
    localStorage.setItem('totalBill', JSON.stringify(this.totalCartBill));
    this.modalRef.hide();
  }

}