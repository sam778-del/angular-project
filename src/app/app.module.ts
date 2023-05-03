import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AccountService } from 'src/app/core/services/auth.service';
import { fakeBackendProvider, JwtInterceptor, ErrorInterceptor, appInitializer } from './helpers';
import { APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { AuthComponent } from './modules/auth/auth.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { SidebarComponent } from './modules/layout/pages/sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ResponsiveHelperComponent,
    AuthComponent,
    LayoutComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot(environment.auth0),
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
