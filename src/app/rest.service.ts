import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { User } from './interface/user'
import { Place } from './interface/place'

const endpoint = 'http://localhost:5000/'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient) { }

  getUser(id:String): Observable<User> {
    return this.http.get<User>(`${endpoint}user/${id}`)
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${endpoint}user`)
  }

  getPlaceList(): Observable<Place[]> {
    return this.http.get<Place[]>(`${endpoint}place`)
  }

  getPlace(id:String): Observable<Place> {
    return this.http.get<Place>(`${endpoint}place/${id}`)
  }

  addUser(user:User): Observable<User> {
    return this.http.post<User>(`${endpoint}user`, JSON.stringify(user), httpOptions)
  }

  addPlace(place:Place): Observable<Place> {
    return this.http.post<Place>(`${endpoint}place`, JSON.stringify(place), httpOptions)
  }

  updatePlace(place:Place, id:String): Observable<Place> {
    return this.http.patch<Place>(`${endpoint}place/${id}`, JSON.stringify(place), httpOptions)
  }
}
