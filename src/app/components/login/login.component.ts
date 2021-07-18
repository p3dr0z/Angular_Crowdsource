import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { User } from 'src/app/interface/user';
import { RestService } from 'src/app/rest.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: User[] = []

  constructor(private router: Router, public rest: RestService) { }

  ngOnInit(): void {
    this.rest.getUserList().subscribe((data: User[]) => {
      this.users = data
    })
  }

  authenticateUser() {
    let username = document.getElementById('username') as HTMLInputElement
    let password = document.getElementById('password') as HTMLInputElement
    for (let u of this.users) {
      if ( u.username == username.value && u.pass == password.value) { 
        this.router.navigate([`home/${u._id}`])
        return
     }
    }
    alert('Credenciais erradas')
  }

  registerPage() {
    this.router.navigate(['register'])
  }

  hasRoute(route: String) {
    return this.router.url === route
  }

}
