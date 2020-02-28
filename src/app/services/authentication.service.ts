import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Url, IUser, Msg } from '../models';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  baseUrl: string = environment.baseUrl;
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(
    private dataService: DataService
  ) {}

  login(username: string, password: string): Observable<IUser> | Observable<string> {
    const users: IUser[] = this.dataService.getLocalUsers();
    const matchedUser = users.find((user: IUser) => user.name === username && user.birth_year === password);
    if (matchedUser) {
      return of(matchedUser);
    } else {
      return throwError(Msg.LoginError);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
