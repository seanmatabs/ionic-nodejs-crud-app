import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  updateUserForm: FormGroup;
  id: any;

  constructor(
      private userAPI: UserService,
      private actRoute: ActivatedRoute,
      private router: Router,
      public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getUserData(this.id);
    this.updateUserForm = this.fb.group({
      username: '',
      name: '',
      surname: '',
      birthday: '',
    });
  }

  getUserData(id) {
    this.userAPI.getUser(id).subscribe(res => {
      console.log(res);
      this.updateUserForm.setValue({
        username: res.username ? res.username : null,
        name: res.name,
        surname: res.surname,
        birthday: res.birthday,
      });
    });
  }

  updateForm() {
    if (!this.updateUserForm.valid) {
      return false;
    } else {
      this.userAPI.updateUser(this.id, this.updateUserForm.value)
          .subscribe((res) => {
            console.log(res);
            this.updateUserForm.reset();
            this.router.navigate(['/home']);
          });
    }
  }

}
