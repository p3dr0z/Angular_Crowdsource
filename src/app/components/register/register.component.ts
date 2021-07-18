import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: String = ""
  pass: String = ""
  confirmPass?: String
  
  constructor(public rest : RestService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser() {
    const newUser: User = {
      username: this.username,
      pass: this.pass
    }
    if (this.pass == this.confirmPass) {
    this.rest.addUser(newUser).subscribe((result : User) => {
        this.router.navigate(['login'])
        alert('User registado')
    }, (err) => {
      alert('Erro ' + err.status + ': Dados inválidos')
    })
    } else {
      alert('Password não corresponde')
    }
  }

  loginPage() {
    this.router.navigate(['/'])
  }

}