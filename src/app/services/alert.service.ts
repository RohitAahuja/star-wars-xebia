import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../models';

@Injectable({ providedIn: 'root' })
export class AlertService {
    public subject = new Subject<any>();
    public currentUser: IUser;

    constructor() {}

    success(message: string) {
        this.subject.next({type: 'success', text: message});
    }

    error(message: string) {
        this.subject.next({ type: 'error', text: message });
    }
}
