import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
@Injectable()
export class SplashScreenStateService {
  isStopped: boolean = false;
  subject = new Subject();
  subscribe(onNext): Subscription {
    return this.subject.subscribe(onNext);
  }
  stop() {
    if (!this.isStopped) {
      this.subject.next(false);
      this.isStopped = true;
    }
  }
}