import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/core/services/permission.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  loading: boolean = false;
  error: any = null;
  errorMessage: string = '';

  roles: any[] = [];
  permissions: any[] = [];
  roleId?: number;

  constructor(
    private rolePermissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    // Retrieve roles and permissions using the RolePermission service
    this.rolePermissionService.getAllRoles().subscribe(
      (data: any) => {
        console.log(data)
        this.roles = data;
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.errorMessage = error.message;
        this.loading = false;
      }
    );

    this.rolePermissionService.getAllPermissions().subscribe(
      (data: any) => {
        this.permissions = data;
        this.loading = false;
      },
      (error: any) => {
        this.errorMessage = error.message;
        this.error = error;
      }
    );
  }

  getActivePermissionByRole(roleId: number, permissionId: number) {
    console.log(permissionId);
    this.rolePermissionService.getActiveRolePermission(roleId, permissionId).subscribe(
      (activePermissions) => {
        // Set the active status for each permission
        // this.permissions = this.permissions.map((permission) => {
        //   permission.active = activePermissions.includes(permission.id);
        //   return permission;
        // });
        console.log(activePermissions);
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
  }
}
