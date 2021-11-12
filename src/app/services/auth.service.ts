import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = 'http://localhost:5000';
  constructor() { }

  public login(body: any) {
    return axios.post(`${this.url}/login`, body)
      .then(result => result.data)
  }


  public getCurrentUser() {
    const token = localStorage.getItem('token');
    return axios.get(`${this.url}/me`, { headers: { authorization: `Bearer ${token}` } })
      .then(res => { 
        localStorage.setItem('user' , JSON.stringify(res.data) )
        return res.data;
      })
      .catch(err => null)

  }


}
