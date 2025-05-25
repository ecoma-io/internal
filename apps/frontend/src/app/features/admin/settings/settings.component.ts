import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Cài đặt hệ thống</h1>
      <!-- Settings content will go here -->
    </div>
  `
})
export class SettingsComponent {}