import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, UserService } from './services';
import { Subject, Subscription, Observable } from 'rxjs';
import { IUser } from './models';
import { take, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public users: IUser[] = [];
  public currentUser$: Observable<IUser>;
  public loading = true;
  public loading$: Subscription;
  constructor(
    private router: Router,
    private dataService: DataService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users = this.dataService.getLocalUsers();
    if (this.users && !this.users.length) {
      this.getPeople();
      this.userService.setLoadingState(true);
    } else {
      this.userService.setLoadingState(false);
    }
    this.currentUser$ = this.userService.getCurrentUser().pipe(delay(1));
    this.loading$ = this.userService.getLoadingState().pipe(delay(1)).subscribe(
      loading => this.loading = loading
    );
  }

  ngOnDestroy() {
    if (this.loading$) {
        this.loading$.unsubscribe();
    }
  }

  logout() {
    this.userService.clearCurrentUser();
    this.router.navigate(['/login']);
  }

  private getPeople(url?: string) {
    this.dataService.getUsers(url).pipe(take(1)).subscribe(data => {
      if (data.results) {
        this.users.push(...(data.results as IUser[]));
      }
      if (data.next) {
        this.getPeople(data.next);
      } else {
        this.dataService.setUsersLocally(this.users);
        this.userService.setLoadingState(false);
      }
    });
  }

}
