import { Component, OnInit, HostListener, computed, PLATFORM_ID, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutSidebarComponent } from './admin-layout-sidebar.component';
import { AdminLayoutHeaderComponent } from './admin-layout-header.component';
import { ThemeService } from '../../shared/services/theme.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminLayoutSidebarComponent, AdminLayoutHeaderComponent],
  template: `
    <div class="min-h-screen bg-base-200">
      <!-- Overlay for mobile -->
      <div *ngIf="!isSidebarCollapsed && isMobile"
           class="fixed inset-0 bg-black/50 z-40"
           (click)="closeSidebar()"
           (keyup.enter)="closeSidebar()"
           (keyup.escape)="closeSidebar()"
           tabindex="0">
      </div>

      <!-- Main Layout -->
      <div class="flex">
        <!-- Sidebar -->
        <app-admin-layout-sidebar
          [isCollapsed]="isSidebarCollapsed"
          [isMobile]="isMobile"
          [isHovered]="isHovered"
          (hover)="onSidebarHover($event)">
        </app-admin-layout-sidebar>

        <!-- Main Content -->
        <main class="flex-1 min-h-screen transition-all duration-300"
              [class.lg:ml-64]="!isSidebarCollapsed || (isHovered && !isMobile)"
              [class.lg:ml-20]="isSidebarCollapsed && (!isHovered || isMobile)">
          <!-- Header -->
          <app-admin-layout-header
            [isDarkTheme]="isDarkTheme()"
            (toggleSidebar)="toggleSidebar()"
            (toggleTheme)="toggleTheme()">
          </app-admin-layout-header>

          <!-- Page Content -->
          <div>
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AdminLayoutComponent implements OnInit {
  isSidebarCollapsed = false;
  isHovered = false;
  isMobile = false;
  isDarkTheme = computed(() => this.themeService.theme() === 'dark');

  constructor(
    public themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();
    }
  }

  private checkMobile() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 1024;
    }
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  closeSidebar() {
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

  onSidebarHover(isHovered: boolean) {
    if (!this.isMobile) {
      this.isHovered = isHovered;
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
