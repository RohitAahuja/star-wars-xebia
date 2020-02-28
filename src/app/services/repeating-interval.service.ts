import { Injectable } from '@angular/core';
import { Observable, timer, Subject, Subscription } from 'rxjs';
import { map, takeUntil, repeatWhen } from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class RepeatingIntervalService<T> {
  destroy$: Subscription;
  readonly observable$: Observable<T>;
  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();
  constructor() {
    this.observable$ = timer(0, 60 * 1000)
      .pipe(
        map(() => <T>{}),
        takeUntil(this._stop),
        repeatWhen(() => this._start)
      );
  }

  start(): void {
    this._start.next();
  }

  stop(): void {
    this._stop.next();
  }
}
