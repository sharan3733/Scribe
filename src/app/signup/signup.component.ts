import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,  } from '@angular/forms';
import {AuthService} from "../serivces/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  myForm: FormGroup;

constructor(public fb: FormBuilder, private authService:AuthService,private router: Router){
  this.myForm = this.fb.group({
    firstName: new FormControl(null,Validators.required),
    lastName: new FormControl(null, Validators.required),
    email:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    confirmPassword: new FormControl( null,[Validators.required,Validators.minLength(8)])
  },{
    validator: this.checkIfMatchingPasswords("password","confirmPassword")
  })

}

checkIfMatchingPasswords(passwordKey: string, confirmPasswordKey: string){
  return(group: FormGroup) =>{
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];
    if(password.value == confirmPassword.value){
      return;
    }else {
      confirmPassword.setErrors( {
        notEqualtoPassword: true

      })
    }
  }

}
onSubmit( myForm:any){
console.log(this.myForm.value);
let email: string = myForm.value.email;
let password: string = myForm.value.password;
let firstName: string = myForm.value.firstName;
let lastName: string = myForm.value.lastName;

this.authService.signUp(email, password).subscribe()=>{
  console.log("response");
})
}

}
