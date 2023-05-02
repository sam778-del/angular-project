import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from './service/UserService';
import { RoleComponent } from './pages/role/role.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [DashboardComponent, RoleComponent, UserComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    UserService
  ]
})
export class DashboardModule {}