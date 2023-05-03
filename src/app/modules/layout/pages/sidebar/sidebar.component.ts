import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.accountService.logout();
    this.router.navigate(['/auth/login']);
  }
}
