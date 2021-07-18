import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Place } from 'src/app/interface/place';
import { User } from 'src/app/interface/user';
import { RestService } from 'src/app/rest.service'

@Component({
  selector: 'app-place-page',
  templateUrl: './place-page.component.html',
  styleUrls: ['./place-page.component.css']
})
export class PlacePageComponent implements OnInit {

  place: Place | undefined
  user: User | undefined
  arrID: Array<String> = this.route.snapshot.params['id'].split('_') // index 0: user id; index 1: place id

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {  }

  ngOnInit(): void {
    this.rest.getPlace(this.arrID[1]).subscribe((placeData: Place) => {
      this.place = placeData
      this.rest.getUser(placeData.user).subscribe((userData: User) => {
        this.user = userData
      })
    })
  }

  likePlace() {
    this.changeLikesValues(this.place?.usersLiked, this.place?.usersDisliked)
  }

  dislikePlace() {
    this.changeLikesValues(this.place?.usersDisliked, this.place?.usersLiked)
  }

  changeLikesValues(newValue: any, removeValue: any) {
    if (newValue.includes(this.arrID[0])) return alert('Já deu dislike')
    this.removeFromArray(this.arrID[0], removeValue)
    newValue.push(this.arrID[0])
    let updatePlace: any
    if (newValue == this.place?.usersLiked) updatePlace = { usersLiked: newValue, usersDisliked: removeValue }
    if (newValue == this.place?.usersDisliked) updatePlace = { usersLiked: removeValue, usersDisliked: newValue }
    this.rest.updatePlace(updatePlace, this.arrID[1]).subscribe((result: Place) => { console.log(result) })
  }

  removeFromArray(value: String, array: any) {
    array.forEach((item: String, index: Number) => {
      if ( item == value ) array.splice(index, 1)
    })
  }

  inicioPage() {
    this.router.navigate([`home/${this.arrID[0]}`])
  }

}
