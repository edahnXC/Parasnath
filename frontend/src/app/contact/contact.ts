import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  ngOnInit() {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('data-loaded'));
    }, 80);
  }

  onSubmit() {
    if (!this.name || !this.email || !this.message) return;
    this.submitted = true;
    
    // Simulate API form submission
    setTimeout(() => {
      this.success = true;
      this.submitted = false;
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
    }, 1200);
  }
}
