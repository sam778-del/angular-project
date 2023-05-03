import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    // redirect to home if already logged in
    if (this.accountService.accountValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.accountService.logout();
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/dashboard/users']);
    }
  }

  loginWithFacebook() {
    this.accountService.loginFacebookSdk()
      .subscribe(() => {
        // get return url from query parameters or default to home page
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      });
  }

  signIn() {
    this.router.navigate(['/auth0']);
  }
}
