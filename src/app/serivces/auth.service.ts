import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  signUp(email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

logout(){
    return from(this.auth.signOut());
}
login(email:string,password:string){
    return from(signInWithEmailAndPassword(this.auth,email,password));
}
}
