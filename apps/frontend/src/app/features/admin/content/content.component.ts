import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Quản lý nội dung</h1>
      <!-- Content management content will go here -->
    </div>
  `
})
export class ContentComponent {}