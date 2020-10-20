import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  userForm: FormGroup;

  constructor(
      private userAPI: UserService,
      private router: Router,
      public fb: FormBuilder,
      private zone: NgZone
  ) {
    this.userForm = this.fb.group({
      username: '',
      name: '',
      surname: '',
      birthday: '',
    });
  }

  ngOnInit() { }

  onFormSubmit() {
    if (!this.userForm.valid) {
      return false;
    } else {
      this.userAPI.addUser(this.userForm.value)
          .subscribe((res) => {
            this.zone.run(() => {
              console.log(res);
              this.userForm.reset();
              this.router.navigate(['/home']);
            });
          }, error1 => {
          });
    }
  }
}
