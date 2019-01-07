import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { CartService } from '../cart/cart.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [CartService]
})
export class MenuComponent implements OnInit {
  id;
  private sub;
  menus;
  allMenus;
  menu;
  mcart;
  scart: AngularFireList<any>;
  totalCartBill;
  cartShow: boolean = false;
  modalRef: BsModalRef;
  userId;
  user;
  
  constructor(private router: ActivatedRoute,
    private router1: Router,
    public db: AngularFireDatabase,
    private cartService: CartService,
    private modalService: BsModalService) {
    this.userId = firebase.auth().currentUser.uid;
    let self = this;
    this.menus = firebase.database().ref('/menus').on('value', function (snapshot) {
      self.allMenus = snapshot.val();
      //console.log(self.allMenus);
    });
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id'];
      //console.log(this.id);
    });
    this.scart = db.list('/cart');
    //this.menus = db.list('/menus');
    //console.log(this.menus);
  }
  ngOnInit() {
    this.getMenu(this.id);
    this.mcart = this.cartService.getCart();
    // this.rName = this.appService.getResturantByResturantId(this.id);
    // //console.log(this.rName);
    this.totalCartBill = this.cartService.totalBill();
    this.getUser();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getUser() {
    firebase.database().ref('/users').orderByChild('id').equalTo(this.userId).on('value', (snapshot) => {
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

  getMenu(resturantId) {
    for (var id in this.allMenus) {
      if (resturantId == this.allMenus[id].resturantId) {
        this.menu = this.allMenus[id];
        console.log(this.menu);
      }
    }
  }

  back() {
    this.router1.navigate(['restauarants'])
  }

  cart() {
    this.router1.navigate(['cart'])
  }

  orderRequest() {
    // this.mcart['TotalBill'] = this.totalCartBill;
    // console.log(this.mcart);
    this.scart.push({
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

  addToCart(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice) {
    this.cartShow = true;
      this.cartService.addItem(resturantId, resturantName, dishId, dishName, dishPrice, dishQuantity, totalPrice);
      this.totalCartBill = this.cartService.totalBill();
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

}