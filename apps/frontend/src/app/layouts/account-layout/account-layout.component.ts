import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-account-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-base-200">
      <div class="navbar bg-base-100 shadow-lg">
        <div class="flex-1">
          <a routerLink="/" class="btn btn-ghost normal-case text-xl">Ecoma</a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li><a routerLink="/account/settings">Settings</a></li>
            <li><a routerLink="/auth/login">Logout</a></li>
          </ul>
        </div>
      </div>
      <div class="container mx-auto p-4">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AccountLayoutComponent {
  constructor(public themeService: ThemeService) {}
}
