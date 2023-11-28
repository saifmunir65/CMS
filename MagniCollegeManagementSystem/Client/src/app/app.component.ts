import { Component } from '@angular/core';
import { SplashScreenStateService } from './shared/splash-screen-state.service';;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private splashScreenStateService: SplashScreenStateService,
  ) { }

  title = 'Client';
  ngOnInit(): void {
    setTimeout(() => {
      this.splashScreenStateService.stop();
    }, 2);
  }
}