import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements OnInit {
  name = '';
  email = '';
  subject = '';
  message = '';
  
  submitted = false;
  success = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('data-loaded'));
    }, 80);
  }

  onSubmit() {
    if (!this.name || !this.email || !this.message) return;
    this.submitted = true;
    
    const payload = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    };

    this.http.post(`${environment.apiUrl}/api/contact`, payload).subscribe({
      next: () => {
        this.success = true;
        this.submitted = false;
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
      },
      error: (err) => {
        console.error('Contact form submission failed', err);
        this.submitted = false;
        // Should ideally show an error message on the UI
      }
    });
  }
}
