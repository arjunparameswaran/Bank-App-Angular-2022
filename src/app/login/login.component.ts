import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // properties / variables

aim = 'Your Perfect Banking Partner'

account = 'Account number here'

// variable for holding user account number
acno=""
// to hold uswer pswd
pswd=""

// Database
  userDetails:any ={
    1000:{acno:1000,username:'Neer',password:1000,balance:5000},
    1001:{acno:1001,username:'Laisha',password:1001,balance:6000},
    1002:{acno:1002,username:'Vyom',password:1002,balance:4000}
  }

  // constructor - Dependency Injection
  constructor(private router:Router,private ds:DataService) { }

  // life cycle hook - angular
  ngOnInit(): void {
  }

  // user defined functions


  // // acnoChange
  // acnoChange(event:any){
  //   this.acno = event.target.value
  //   console.log(this.acno)
  // }

  //  // pswdChange
  //  pswdChange(event:any){
  //   this.pswd = event.target.value
  //   console.log(this.acno)
  // }



  //login{}
  login(){
    var acno = this.acno
    var pswd = this.pswd
    // calling login - dataService
    const result=this.ds.login(acno,pswd)    
    if(result){
        alert('Login Successful')
        this.router.navigateByUrl('dashboard')
    }   
    }

// template reference
  // login(a:any,p:any){
  //   // console.log(a);
  //    var acno = a.value
  //   var pswd = p.value

  //   let userDetails = this.userDetails

  //   if(acno in userDetails){
  //     if(pswd ==userDetails[acno]['password']){
  //       alert('Login Successful')
  //   }
  //   else{
  //     alert('Incorrect password!!')
  //   }
  // }
  //   else{
  //     alert('User doesnot exist!!')
  //   }
  // }


}
