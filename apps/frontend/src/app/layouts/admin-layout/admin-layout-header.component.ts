import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-admin-layout-header',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <header class="h-16 glass-morphism sticky top-0 z-40 border-b border-base-200">
      <div class="flex h-full items-center justify-between px-4">
        <!-- Toggle Sidebar -->
        <button class="btn btn-ghost btn-sm" (click)="toggleSidebar.emit()">
          <app-icon path="/duotone/bars.svg" class="w-5 h-5 fill-primary"></app-icon>
        </button>

        <!-- Right Actions -->
        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <button class="btn btn-ghost btn-sm btn-circle" (click)="toggleTheme.emit()">
            <app-icon [path]="isDarkTheme ? '/duotone/sun.svg' : '/duotone/moon.svg'" class="w-5 h-5 fill-primary"></app-icon>
          </button>

          <!-- Notifications -->
          <div class="dropdown dropdown-end">
            <button tabindex="0" class="btn btn-ghost btn-sm btn-circle">
              <div class="indicator">
                <app-icon path="/duotone/bell.svg" class="w-5 h-5 fill-primary"></app-icon>
                <span class="badge badge-xs badge-primary indicator-item">3</span>
              </div>
            </button>
            <div tabindex="0" class="dropdown-content z-[1] card card-compact w-80 p-2 shadow-lg bg-base-100">
              <div class="card-body">
                <h3 class="font-bold text-lg">Notifications</h3>
                <div class="space-y-4">
                  <div class="flex items-start gap-4">
                    <div class="avatar">
                      <div class="w-10 rounded-full">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User" />
                      </div>
                    </div>
                    <div>
                      <p class="font-medium">New user registered</p>
                      <p class="text-sm opacity-70">2 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile -->
          <div class="dropdown dropdown-end ml-4">
            <button tabindex="0" class="btn btn-ghost btn-sm btn-circle avatar">
              <div class="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
              </div>
            </button>
            <div tabindex="0" class="dropdown-content z-[1] card card-compact w-64 p-2 shadow-lg bg-base-100">
              <div class="card-body">
                <div class="flex items-center gap-4 mb-4">
                  <div class="avatar">
                    <div class="w-10 rounded-full">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
                    </div>
                  </div>
                  <div>
                    <p class="font-bold">Admin</p>
                    <p class="text-sm opacity-70">admin&#64;example.com</p>
                  </div>
                </div>
                <div class="space-y-2">
                  <a routerLink="/account" class="btn btn-ghost btn-sm btn-block justify-start">
                    <span class="text-lg mr-2">👤</span> Profile
                  </a>
                  <a routerLink="/account/settings" class="btn btn-ghost btn-sm btn-block justify-start">
                    <span class="text-lg mr-2">⚙️</span> Settings
                  </a>
                  <div class="divider my-1"></div>
                  <a routerLink="/auth/login" class="btn btn-ghost btn-sm btn-block justify-start text-error">
                    <span class="text-lg mr-2">🚪</span> Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Glass morphism */
    .glass-morphism {
      @apply bg-base-100/50 backdrop-blur-lg;
    }
  `]
})
export class AdminLayoutHeaderComponent {
  @Input() isDarkTheme = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
}