import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.accountService.checkTokenValidity().subscribe(
    //   valid => {
    //     if (!valid) {
    //       // logout the user and redirect to login page
    //       // this.accountService.logout();
    //       // this.router.navigate(['/auth/login']);
    //     }
    //   },
    //   error => {
    //     // this.accountService.logout();
    //     // this.router.navigate(['/auth/login']);
    //     console.error(error); // handle error if any
    //   }
    // );
  }

}
