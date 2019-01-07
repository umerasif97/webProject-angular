import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrestauarant',
  templateUrl: './addrestauarant.component.html',
  styleUrls: ['./addrestauarant.component.css']
})
export class AddrestauarantComponent implements OnInit {
  resturants: AngularFireList<any>;
  cusines = [''];
  constructor(public db: AngularFireDatabase,
              private router: Router) {
    this.resturants = db.list('/resturant');
  }

  ngOnInit() {
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  addResturant(name, detail, cusines, picture) {
    this.resturants.push({
      id: this.guid(),
      name: name,
      detail: detail,
      cusines: cusines,
      picture: picture
    });
  }

  addCusine() {
    this.cusines.push('');
  }

  removeCusine() {
    this.cusines.pop();
  }

  addMenu(){
    this.router.navigate(['addmenu'])
  }

  Orders(){
    this.router.navigate(['orders'])
  }
}