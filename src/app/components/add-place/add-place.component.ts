import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/interface/place';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {

  name: String = ""
  category: String = ""
  address: String = ""

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  addPlace() {
    let userID = this.route.snapshot.params['id']
    const newPlace: Place = {
      name: this.name,
      category: this.category,
      address: this.address,
      usersLiked: [],
      usersDisliked: [],
      user: userID
    }
    this.rest.addPlace(newPlace).subscribe((result: Place) => {
      alert('Local adicionado')
      this.router.navigate([`profile/${userID}`])
      console.log(result)
    }, (err) => {
      alert(`Erro`)
      console.log(err)
    })
  }

  profilePage() {
    let id = this.route.snapshot.params['id']
    this.router.navigate([`profile/${id}`])
  }
  
}
