import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  ordersList;
  arr = [];
  constructor(public db: AngularFireDatabase,
              private router: Router) { 
    this.db.list('/cart').valueChanges().subscribe(res=>{
      console.log(res);
      this.ordersList=res;
    });
  }

  ngOnInit() {
    
  }

  addresturant(){
    this.router.navigate(['addrestauarant']);
  }

  addMenu(){
    this.router.navigate(['addmenu']);
  }
}
