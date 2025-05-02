import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiBaseUrl, getAuthToken, getUserName } from "../util/helper";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']

})
export class ReportsComponent implements AfterViewInit {
  constructor(public auth: AuthService, private http: HttpClient, private cdref: ChangeDetectorRef) { }
  username: string | null = '';
  title = 'project';


  logout() {
    this.auth.logout();
  }


  ngAfterViewInit(): void {
    this.username = getUserName()
    this.cdref.detectChanges(); // manually trigger change detection
    const token = getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(apiBaseUrl + 'api/chart/pie', { headers }).subscribe({
      next: (res) => {
        if (res.length > 0) {
          const chartData = res[0]; // Use only the first chart
          const ctx = document.getElementById('reportsChart') as HTMLCanvasElement;

          if (!ctx) return;

          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: chartData.labels,
              datasets: [
                {
                  label: chartData.label,
                  data: chartData.data,
                  backgroundColor: chartData.backgroundColor,
                  borderColor: chartData.borderColor,
                  borderWidth: chartData.borderWidth
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    color: '#2c3e50',
                    font: { size: 14 }
                  }
                }
              }
            }
          });
        }
      },
      error: (err) => {
        console.error('Error loading chart data:', err);
      }
    });
  }

}

