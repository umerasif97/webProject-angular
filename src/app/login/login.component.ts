import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User = new User();
  dbUser;
  match;

    constructor(public db: AngularFireDatabase,
                private router: Router) {
      this.dbUser = db.list('/users')
      .valueChanges()
      .subscribe(res => {
        //console.log(res)//should give you the array of percentage. 
        this.dbUser = res;
      })
    //console.log(this.dbUser)
    }

    ngOnInit() {
    }

    async login() {
      if(this.user.email == "admin@admin.com" && this.user.password == "admin12345"){
        this.router.navigate(['addrestauarant'])
      }else{
      try {
        var r = await firebase.auth().signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        if (r) {
          this.router.navigate(['restauarants']);
          //console.log(firebase.auth().currentUser.uid)
          
          //localStorage.setItem('password', (this.user.password));
          //console.log(localStorage.getItem('password'));
        }
      }
      catch (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.message);
        // ...
      };
    }
  }
}