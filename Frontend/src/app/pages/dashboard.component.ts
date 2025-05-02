import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { getUserName } from '../util/helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  // template: `

  //   <h2>Dashboard</h2>
  //   <p>
  //     Recent innovations in Clean Energy over the past 6 months have focused on new solar panel 
  //     materials, battery storage improvements, and global green hydrogen production. Companies like 
  //     Tesla, First Solar, and Siemens Energy have announced breakthroughs in solid-state battery 
  //     designs and ultra-efficient wind turbines. Countries are also investing heavily in energy 
  //     decentralization using community solar projects and microgrids. AI is now being used to 
  //     optimize energy usage patterns and predict demand fluctuations more efficiently, reducing 
  //     waste. These innovations aim to accelerate the global shift toward net-zero emissions.
  //   </p>
  //   <p><strong>Source:</strong> <a href="https://www.energy.gov/eere/articles" target="_blank">energy.gov</a></p>
  //   <p><strong>Tech Stack:</strong> Angular (SPA), Chart.js, JWT Authentication, Node.js backend, served via NGINX on same server</p>
  // `
})
export class DashboardComponent {
  username: string | null = '';

  constructor(public auth: AuthService, private cdref: ChangeDetectorRef) { }
  title = 'project';


  ngAfterViewInit() {
    this.username = getUserName()
    this.cdref.detectChanges(); // manually trigger change detection
  }


  ngOnInit(): void {
    // const user = this.auth.getLoggedInUser();
    this.username = getUserName();
  }
  logout() {
    this.auth.logout();
  }
}
