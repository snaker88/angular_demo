import { Component } from '@angular/core';
import {createUserWithEmailAndPassword} from '@angular/fire/auth'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-cpa';
}
