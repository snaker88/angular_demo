import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpFirebaseService, User, City} from '../http-firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User[]
  city: City[] =[]
  userId: string
  form: FormGroup
  formCity: FormGroup

  constructor(private http: HttpClient, private auth: AngularFireAuth, private router: Router, private httpfirebase: HttpFirebaseService) { }

  ngOnInit(): void {
    this.httpfirebase.fetchCity().subscribe(city =>this.city = Object.values(city))
    this.httpfirebase.fetchUser().subscribe(user=> this.userId = ''+Object.keys(user))
    this.httpfirebase.fetchUser().subscribe(user=> this.user = Object.values(user))
    this.form = new FormGroup(
      {
        name: new FormControl('', [Validators.minLength(1)]),
        surname: new FormControl(),
        date: new FormControl()
      }
    )
    this.formCity = new FormGroup(
      {
        nameCity: new FormControl('', [Validators.minLength(2)])
      }
    )
  }

  onLogout(){
     this.auth.signOut()
     this.router.navigate(['login'])
  }

  submit(){
    this.user[0].name = this.form.value.name
    this.user[0].surname = this.form.value.surname
    this.user[0].date = this.form.value.date
    this.httpfirebase.changeUser(this.user, this.userId).subscribe()
    console.log('https://angular-spa-f9725-default-rtdb.firebaseio.com/users/'+this.userId+'.json')
    console.log(this.user[0])

  }

  addCity(){
    const newCity: City = {
      name: this.formCity.value.nameCity,
      id: '',
      userId: this.userId
    }
    this.httpfirebase.addCity(newCity).subscribe(()=>this.city.push(newCity))
    console.log(newCity)
  }

}
