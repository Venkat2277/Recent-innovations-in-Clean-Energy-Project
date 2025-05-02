import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { getToken } from '../util/helper';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = getToken()
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {

    this.auth.login(this.username, this.password).subscribe({
      next: () => { },
      error: (err) => {
        this.error = 'Invalid username or password';
        console.error('Login error:', err);
      }
    });
    // if (!this.auth.login(this.username, this.password)) {
    //   this.error = 'Invalid credentials. Try again.';
    // }
  }
}