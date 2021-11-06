import { Injectable } from '@angular/core';
import axios from 'axios';
import { TODO } from '../components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // url: string = 'https://jsonplaceholder.typicode.com';
  url: string = 'http://localhost:5000';

  constructor() { }



  public getAll() {
    return axios.get<TODO[]>(`${this.url}/todos`)
      .then(result => result.data)
  }

  public save(newTodo: TODO) {
    return axios.post<TODO>(`${this.url}/todos`, newTodo)
      .then(result => result.data)
  }

  public removeOne(id: string) {
    return axios.delete(`${this.url}/todos/${id}`)
      .then(result => result.data)
  }

  public patch(id: string, newTodo: Partial<TODO>) {
    return axios.patch(`${this.url}/todos/${id}`, newTodo)
      .then(result => result.data)
  }



}
