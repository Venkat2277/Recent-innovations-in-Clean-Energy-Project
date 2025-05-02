import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiBaseUrl, getAuthToken, getUserName } from "../util/helper";
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']

})
export class SummaryComponent implements AfterViewInit {

  constructor(private http: HttpClient, public auth: AuthService, private cdref: ChangeDetectorRef) { }
  username: string | null = '';
  title = 'project';
  logout() {
    this.auth.logout();
  }


  ngAfterViewInit(): void {
    this.username = getUserName();
    this.cdref.detectChanges();
    const token = getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(apiBaseUrl + 'api/chart/bar', { headers }).subscribe({
      next: (res) => {
        if (res.length > 0) {
          const ctx = document.getElementById('summaryChart') as HTMLCanvasElement;
          if (!ctx) return;

          // Assume all charts share the same labels
          const chartLabels = res[0].labels;

          const datasets = res.map(item => ({
            label: item.label,
            data: item.data,
            backgroundColor: item.backgroundColor[0]
          }));

          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: chartLabels,
              datasets: datasets
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
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Adoption Units'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Month'
                  }
                }
              }
            }
          });
        }
      },
      error: (err) => {
        console.error('Failed to load bar chart data:', err);
      }
    });
  }

  // ngAfterViewInit() {
  //   new Chart('summaryChart', {
  //     type: 'bar',
  //     data: {
  //       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //       datasets: [
  //         { label: 'Solar', data: [10, 20, 25, 30, 40, 50], backgroundColor: 'orange' },
  //         { label: 'Wind', data: [15, 25, 20, 35, 45, 60], backgroundColor: 'lightblue' }
  //       ]
  //     }
  //   });
  // }
}
