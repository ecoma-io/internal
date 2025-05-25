import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-admin-layout-sidebar-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <nav class="py-4">
      <ul class="menu menu-sm gap-2 px-4">
        <li>
          <a routerLink="/app/dashboard"
             routerLinkActive="active"
             class="flex gap-3 h-10 hover:translate-x-1 transition-transform rounded-xl">
            <app-icon path="/duotone/chart-bar.svg" class="w-5 h-5 fill-primary"></app-icon>
            <span class="flex-1" [class.hidden]="isCollapsed">Dashboard</span>
          </a>
        </li>

        <li>
          <details>
            <summary class="flex gap-3 h-10 hover:translate-x-1 transition-transform rounded-xl">
              <app-icon path="/duotone/user.svg" class="w-5 h-5 fill-primary"></app-icon>
              <span class="flex-1" [class.hidden]="isCollapsed">Users</span>
            </summary>
            <ul class="py-4">
              <li><a routerLink="/app/users" routerLinkActive="active">All Users</a></li>
              <li><a routerLink="/app/users/roles" routerLinkActive="active">Roles</a></li>
            </ul>
          </details>
        </li>

        <li>
          <details>
            <summary class="flex gap-3 h-10 hover:translate-x-1 transition-transform rounded-xl">
              <app-icon path="/duotone/files.svg" class="w-5 h-5 fill-primary"></app-icon>
              <span class="flex-1" [class.hidden]="isCollapsed">Content</span>
            </summary>
            <ul class="py-4">
              <li><a routerLink="/app/content/posts" routerLinkActive="active">Posts</a></li>
              <li><a routerLink="/app/content/categories" routerLinkActive="active">Categories</a></li>
              <li><a routerLink="/app/content/media" routerLinkActive="active">Media</a></li>
            </ul>
          </details>
        </li>

        <li>
          <a routerLink="/app/chat"
             routerLinkActive="active"
             class="flex gap-3 h-10 hover:translate-x-1 transition-transform rounded-xl">
            <app-icon path="/duotone/comments.svg" class="w-5 h-5 fill-primary"></app-icon>
            <span class="flex-1" [class.hidden]="isCollapsed">Chat</span>
          </a>
        </li>

        <li>
          <a routerLink="/app/settings"
             routerLinkActive="active"
             class="flex gap-3 h-10 hover:translate-x-1 transition-transform rounded-xl">
            <app-icon path="/duotone/gear.svg" class="w-5 h-5 fill-primary"></app-icon>
            <span class="flex-1" [class.hidden]="isCollapsed">Settings</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    :host(.collapsed) .menu summary:after{
      display: none;
    }

    .menu li > *:not(ul, .menu-title, details, .btn):active, .menu li > *:not(ul, .menu-title, details, .btn).active, .menu li > details > summary:active{
      @apply bg-primary/30 text-base-content;
    }
  `]
})
export class AdminLayoutSidebarMenuComponent {
  @Input() isCollapsed = false;
} 