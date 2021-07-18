import { Component, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { RestService } from 'src/app/rest.service'
import { Place } from '../../interface/place'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  places: Place[] = []
  placesByCategory: Place[] = []
  placesByName: Place[] = []

  constructor(private router: Router, public rest: RestService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.rest.getPlaceList().subscribe((data: Place[]) => {
      this.places = data
    })
  }

  usersPage() {
    this.router.navigate(['users'])
  }

  getPlacesByName() {
    let categoryTable = document.getElementById('categoryTable') as HTMLElement
    categoryTable.style.display = "none"
    let nameTable = document.getElementById('nameTable') as HTMLElement
    nameTable.style.display = "table"
    if (this.placesByCategory.length != 0) this.placesByCategory = []
    if (this.placesByName.length != 0) this.placesByName = []
    let thisName = document.getElementById('searchInput') as HTMLInputElement
    this.placesByName = this.places.filter(place => place.name.toUpperCase() == thisName.value.toUpperCase())
    if ( this.placesByName.length == 0 ) return alert(`Nenhum local com o nome ${thisName.value}`)
    else thisName.value = ""
  }

  getPlacesByCategory() {
    let categoryTable = document.getElementById('categoryTable') as HTMLElement
    categoryTable.style.display = "table"
    let nameTable = document.getElementById('nameTable') as HTMLElement
    nameTable.style.display = "none"
    if (this.placesByCategory.length != 0) this.placesByCategory = []
    if (this.placesByName.length != 0) this.placesByName = []
    let allRadio = <any> document.getElementsByName('flexRadioDefault')
    for (let i = 0; i < allRadio.length; i++) {
      if (allRadio[i].checked) this.placesByCategory = this.places.filter( place => place.category == allRadio[i].value)
    }
  }

  placePage(id?: String) {
    let userID = this.route.snapshot.params['id']
    this.router.navigate([`place/${userID}_${id}`])
  }

  loginPage() {
    this.router.navigate(['/'])
  }

  profilePage() {
    let id = this.route.snapshot.params['id']
    this.router.navigate([`profile/${id}`])
  }

}