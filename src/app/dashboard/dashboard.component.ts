import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // deposit -model
  depositForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-z0-90-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  // withdraw -model
   withdrawForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-z0-90-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  // acno1=""
  // pswd1=""
  // amount1=""
  
  // login username
  user:any;
  amount: any;
  amount1: any;

  // acno to child
  acno:any

  // date 
  lDate:any
  constructor(private ds:DataService, private fb:FormBuilder , private router:Router) {
    if(localStorage.getItem('currentUsername')){
          // fetch user name from localstorage
      this.user = JSON.parse(localStorage.getItem('currentUsername') || '')

    }
    this.lDate = new Date()
   }
  ngOnInit(): void {
     if(!localStorage.getItem('token')){
    alert('Please log In....!!!')
       this.router.navigateByUrl('')  
    }
  }


  deposit(){
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    if(this.depositForm.valid){
      // deposit data service -  asynchronous
      const result = this.ds.deposit(acno,pswd,amount)
      .subscribe(
        (result:any)=>{ 
                    alert(result.message)
          this.router.navigateByUrl('dashboard')
        },
        (        result: { error: { message: any; }; }) =>{
          alert(result.error.message)
        }
        )
     }
     else{
      alert('Invalid Form...!!!')
      }
  }

  withdraw(){
    var acno = this.withdrawForm.value.acno
    var pswd = this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount
    if(this.withdrawForm.valid){
      const result = this.ds.withdraw(acno,pswd,amount)
      .subscribe(
        (result:any)=>{
               alert(result.message)
          this.router.navigateByUrl('dashboard')   
         },
         (result: { error: { message: any;}; }) =>{
          alert(result.error.message)
         }
      )
    }
    else{
      alert('Invalid Form...!!!')
    } 
}

// logout
logout(){
  localStorage.removeItem('currentAcno')
  localStorage.removeItem('currentUsername')
  localStorage.removeItem('token')


  // navigate  to login page
  this.router.navigateByUrl('')  
  }

  // deleteParent()
  deleteParent(){
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
  }

  // cancel()  to set acno as empty
  cancel(){
    this.acno=""
  }

  //  onDelete($event)
  onDelete(event:any){
    // asynchronous
    this.ds.delete(event)
    .subscribe(
      (result:any)=>{
        alert(result.message)
       this.logout()  
      },
      result=>{ 
        alert(result.error.message)
      }
    )
  }
}
