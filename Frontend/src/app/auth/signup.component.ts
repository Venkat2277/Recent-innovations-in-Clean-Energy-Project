import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService) {}

  signup() {
    this.auth.signup(this.username, this.password);
  }
}
