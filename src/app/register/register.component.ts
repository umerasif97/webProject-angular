import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AngularFireAuth]
})
export class RegisterComponent implements OnInit {
  dbUser: AngularFireList<any>;
  public user: User = new User();
  constructor(public fAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    private router: Router) {
    this.dbUser = db.list('/users');
  }

  ngOnInit() {
  }


  async signup() {
    try {
      var r = await firebase.auth().createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        this.dbUser.push({
          id: firebase.auth().currentUser.uid,
          email: this.user.email,
          name: this.user.name,
          address: this.user.address,
          phoneNumber: this.user.phoneNumber
        })
        alert("Successfully registered");
        this.router.navigate(['']);
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