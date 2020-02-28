import { Injectable } from '@angular/core';
import { IUser } from '../models';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UserService {
    currentUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    setCurrentUser(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.next(user);
    }

    getCurrentUser(): Observable<IUser> {
        const user = JSON.parse(localStorage.getItem('user'));
        this.currentUser.next(user);
        return this.currentUser.asObservable();
    }

    clearCurrentUser(): void {
        localStorage.setItem('user', null);
        this.currentUser.next(null);
    }

    setLoadingState(state: boolean) {
        this.loading.next(state);
    }

    getLoadingState(): Observable<boolean> {
        return this.loading.asObservable();
    }
}
