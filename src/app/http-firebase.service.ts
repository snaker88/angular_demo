import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs';


export interface User{
  name?: string
  surname?: string
  date?: string 
  id?: string
}

export interface City{
  name: string
  userId?: string
  id?: string
}

export interface Ticket {
  title?: string
  id?: string
  cityID?: string
  userID?: string
}

@Injectable({
  providedIn: 'root'
})

export class HttpFirebaseService {
  userUrl = 'https://angular-spa-f9725-default-rtdb.firebaseio.com/users/'
  sityUrl = 'https://angular-spa-f9725-default-rtdb.firebaseio.com/sity.json'
  ticketUrl = 'https://angular-spa-f9725-default-rtdb.firebaseio.com/tickets/'

  user: User[] = []

  constructor(private http: HttpClient) { }

  fetchUser(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl+'.json')
    .pipe(delay(100))
  }

  changeUser(user: User[], id: string): Observable<User> {
    return this.http.put<User>(this.userUrl+id+'.json', user[0])
  }

  fetchTicket(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketUrl+'.json')
    .pipe(delay(100))
  }

  delTicket(id: string): Observable<Ticket> {
    return this.http.delete<Ticket>(this.ticketUrl+id+'.json')
    .pipe(delay(100))
  }

  addTicket(ticket:Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.ticketUrl+'.json', ticket)
    .pipe(delay(100))
  }

  fetchCity(): Observable<City[]> {
    return this.http.get<City[]>(this.sityUrl)
    .pipe(delay(100))
  }

  addCity(city:City): Observable<City> {
    return this.http.post<City>('https://angular-spa-f9725-default-rtdb.firebaseio.com/sity.json', city)
    .pipe(delay(100))
  }

}
