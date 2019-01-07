import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restauarantlist',
  templateUrl: './restauarantlist.component.html',
  styleUrls: ['./restauarantlist.component.css']
})
export class RestauarantlistComponent implements OnInit {
  resturants;
  constructor(private router: Router,
    public db: AngularFireDatabase, ) {
    
  }

  ngOnInit() {
    this.db.list('/resturant').valueChanges().subscribe(res=>this.resturants=res);
    //this.resturants = this.appService.getAll();
    //console.log(this.appService.getAll());
  }

  Cart(){
    this.router.navigate(['cart']);
  }

  showMenu(id){
    this.router.navigate(['menu', id]);
    //console.log(id);
  }


}