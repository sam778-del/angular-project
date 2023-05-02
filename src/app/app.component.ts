import { Component } from '@angular/core';
import { AccountService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(protected accountService: AccountService) {}
  title = 'angular-project';
}
