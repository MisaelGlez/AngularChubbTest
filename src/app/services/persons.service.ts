import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private _http: HttpClient) {}

  addPerson(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/persons', data);
  }

  getPersons(): Observable<any> {
    return this._http.get('http://localhost:3000/persons');
  }
}
