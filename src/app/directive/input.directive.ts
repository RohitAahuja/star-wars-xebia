import { Directive, ElementRef, HostListener } from '@angular/core';
import { RepeatingIntervalService, UserService } from '../services';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[appInputFilter]'
})
export class InputFilterDirective {
  count = 0;
  caller = new RepeatingIntervalService<any>();
  constructor(private el: ElementRef, private userService: UserService) {}

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    this.userService.currentUser.pipe(take(1)).subscribe(currentUser => {
      if (currentUser) {
        if (currentUser.name !== 'Luke Skywalker') {
          this.count++;
          if (this.count === 1) {
            setInterval(() => {
              this.count = 0;
              this.caller.start();
            }, 60 * 1000);
          }
          if (this.count > 15) {
            this.caller.stop();
            event.preventDefault();
          } else {
            return;
          }
        }
      }
    });
  }
}
