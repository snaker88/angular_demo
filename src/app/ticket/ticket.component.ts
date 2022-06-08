import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpFirebaseService, Ticket, City} from '../http-firebase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  city: City[]
  ticket: Ticket[]
  form: FormGroup


  constructor(private auth: AngularFireAuth, private router: Router, private httpfirebase: HttpFirebaseService) { }

  ngOnInit(): void {
    this.httpfirebase.fetchCity().subscribe(city=> this.city = Object.values(city))
    this.fetchTicket().subscribe()

    this.form = new FormGroup(
      {
        title: new FormControl()
      }
    )

  }

  fetchTicket(){
   return this.httpfirebase.fetchTicket().pipe(map(ticket =>{
      this.ticket = Object.values(ticket)
      Object.keys(ticket).map((key, i)=>this.ticket[i].id = key)
    }))
  }

  onLogout(){
    this.auth.signOut()
    this.router.navigate(['login'])
  }

 deleteTicket(ticketId?:string){
   if (ticketId == ''){
      console.log('zero!')
      this.ticket = this.ticket.filter(ticket=>ticket.id !== ticketId)
   }
   else{
   this.httpfirebase.delTicket(ticketId+'').subscribe(()=>this.ticket = this.ticket.filter(ticket=>ticket.id !== ticketId))
   }
  }

 addTicket(){
  this.fetchTicket().subscribe()
  const newTicket: Ticket = {
    title: this.form.value.title,
    id: '',
    cityID: '',
    userID: ''
  }
  this.form.value.title = ''
  this.httpfirebase.addTicket(newTicket).subscribe(()=>this.ticket.push(newTicket))
  this.fetchTicket().subscribe()

  }
}
