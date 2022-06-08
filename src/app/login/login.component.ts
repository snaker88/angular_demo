import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  uid: string

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        login: new FormControl('admin@admin.ru'),
        password: new FormControl('admin@admin.ru')
      }
    )
  }

  submit(){
    this.auth.signInWithEmailAndPassword(this.form.value.login, this.form.value.password)
    .then((user)=> {
      console.log(user.user?.uid)
      this.uid = user.user?.uid +''
      this.router.navigate(['profile'])
    })
    console.log(this.form.value.login, ' ', this.form.value.password)

  }

}
