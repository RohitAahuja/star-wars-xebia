import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Url, IUser, IResponse, IPlanets } from '../models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DataService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUsers(nextUrl?: string): Observable<IResponse> {
    return this.http.get<IResponse>(nextUrl || this.baseUrl + Url.people);
  }

  getPlanets(nextUrl?: string): Observable<IResponse> {
    return this.http.get<IResponse>(nextUrl || this.baseUrl + Url.planets);
  }

  setUsersLocally(users: IUser[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getLocalUsers(): IUser[] {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  setPlanetsLocally(planets: IPlanets[]): void {
    localStorage.setItem('planets', JSON.stringify(planets));
  }

  getLocalPlanets(): IPlanets[] {
    return JSON.parse(localStorage.getItem('planets')) || [];
  }
}
