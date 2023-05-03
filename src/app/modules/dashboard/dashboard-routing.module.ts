import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { RoleComponent } from './pages/role/role.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UserComponent },
      { path: 'role', component: RoleComponent },
      { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}