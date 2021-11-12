import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';



export type TODO = {
  title: string,
  completed: boolean,
  _id: string,
  createdAt: number
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  tituloNuevo: string = "";
  newTodo: TODO = {
    title: "",
    createdAt: Date.now(),
    completed: false,
    _id: ""
  }
  errorInName : boolean = false;
  logged = false;
  loginForm = { email : "yunior+eoi5@squaads.com", password : "990011"}

  todos: TODO[] = [];

  constructor(
    private todoService: TodoService, 
    private toastr: ToastrService, 
    private authService : AuthService) {
      if (localStorage.getItem('token')){
        this.logged = true;
        this.loadData();
      }
  }


  loadData(){
    this.todoService.getAll()
    .then(resultados => {
      this.todos = resultados;
    })
    .catch(err => {
      this.toastr.error('No se han podido cargar los todos', 'Titulo')
    })
  }

  addNewTodo() {
    this.todoService.save(this.newTodo)
      .then(newTodo => {
        this.todos.push(newTodo)
      })
      .catch(err => {
        if (err.response.status === 400){

          if (err?.response?.data?.errors?.title){
            this.errorInName = true;


            this.toastr.error('Hay un error con el titulo');
            
          }
        }

      })
  }

  login(){
    this.authService.login( this.loginForm )
      .then(res => {
        localStorage.setItem('token', res.token);
        this.logged = true;
        this.loadData();
      })
      .catch(err => {
        // if (err.status == 400){
        //   this.toastr.error(err.data.message, 'Error')
        // }
      })
  }

  deleteThisTodo(id: string) {
    this.todoService.removeOne(id)
      .then(res => {
        this.todos = this.todos.filter(todo => todo._id != id)
      })
  }

  completeThisTodo(id: string) {
    // Lo busco para poder saber como estaba antes y para tenerlo localizado
    const encontrado = this.todos.find(todo => todo._id == id) as TODO
    this.todoService.patch(id, {
      completed: !encontrado.completed
    })
      .then(res => {
        // Si la api respondió que sí, pues le hago el cambio en frontend también
        encontrado.completed = !encontrado.completed
      })
  }

}
