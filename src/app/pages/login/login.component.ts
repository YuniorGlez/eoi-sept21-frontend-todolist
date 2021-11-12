import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = { email : "yunior+eoi5@squaads.com", password : "990011"}


  constructor( 
    private authService : AuthService,
    private router : Router
    ) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login( this.loginForm )
      .then(res => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/')
      })
      .catch(err => {
        // if (err.status == 400){
        //   this.toastr.error(err.data.message, 'Error')
        // }
      })
  }

}
