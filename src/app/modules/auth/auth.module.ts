import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
      SignInComponent,
      SignUpComponent,
    ],
    imports: [
      CommonModule,
      AuthRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
    ],
})

export class AuthModule {}