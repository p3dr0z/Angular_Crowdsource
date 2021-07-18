import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'
import { User } from 'src/app/interface/user';
import { RestService } from 'src/app/rest.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | undefined

  constructor(public rest: RestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id']
    this.rest.getUser(id).subscribe((data : User) => {
      this.user = data
    })
  }
  
  addPlacePage() {
    this.router.navigate([`profile/addPlace/${this.user?._id}`])
  }

  inicioPage() {
    this.router.navigate([`home/${this.user?._id}`])
  }

  loginPage() {
    this.router.navigate(['/'])
  }
}
