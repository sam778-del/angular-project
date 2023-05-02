import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateService } from 'src/app/core/services/user.service';
import { UserService } from '../../service/UserService';
import { User } from '../../service/user.model';
import { User as CreateModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  @ViewChild('modalRef') modalRef: any;

  userForm: FormGroup;
  submitted = false;

  // modal
  showModal = false;

  // Declare properties for pagination
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  // Declare properties for user list
  userList: User[] = [];
  loading: boolean = false;
  error: any = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private createService: CreateService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.page, this.pageSize).subscribe(
      res => {
        this.userList = res;
        this.totalItems = res.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.loading = false;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  submitForm() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const { name, email, role, password } = this.userForm.value;

    const user: CreateModel = {
      name,
      email,
      role,
      password
    };

    this.createService.createUser(user).subscribe(() => {
      // this.toastr.success('User created successfully.'); 
      this.userForm.reset();
      this.showModal = false;
      this.getUsers();
    }, error => {
      console.error(error);
      this.showModal = false;
      this.error = error;
      // this.toastr.error('Failed to create user.');
    });
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get role() {
    return this.userForm.get('role');
  }

  get password() {
    return this.userForm.get('password');
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onPageChange(pageNumber: number) {
    this.page = pageNumber;
    this.getUsers();
  }
}
