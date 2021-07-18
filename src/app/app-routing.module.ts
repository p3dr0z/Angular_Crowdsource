import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { PlacePageComponent } from './components/place-page/place-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'place/:id', component: PlacePageComponent
  },
  {
    path: 'home/:id', component: HomePageComponent
  },
  {
    path: 'profile/:id', component: ProfileComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'profile/addPlace/:id', component: AddPlaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
