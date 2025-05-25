import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutSidebarMenuComponent } from './admin-layout-sidebar-menu.component';

@Component({
  selector: 'app-admin-layout-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminLayoutSidebarMenuComponent],
  template: `
    <aside class="fixed top-0 left-0 h-screen transition-all duration-300 z-50 bg-base-100/50 backdrop-blur-lg"
           [class.w-64]="!isCollapsed || (isHovered && !isMobile)"
           [class.w-20]="isCollapsed && (!isHovered || isMobile)"
           [class.-translate-x-full]="isCollapsed && isMobile"
           (mouseenter)="onHover(true)"
           (mouseleave)="onHover(false)">
      <!-- Logo -->
      <div class="h-16 flex items-center px-4">
        <span [class.hidden]="isCollapsed && (!isHovered || isMobile)">
          <img src="logo.svg" alt="Ecoma's logo" class="h-6"/>
        </span>
        <span class="w-full flex justify-center" [class.hidden]="!isCollapsed || (isHovered && !isMobile)">
              <img src="logo-mark.svg" alt="Ecoma's logomark" class="h-6"/>
        </span>
      </div>

      <app-admin-layout-sidebar-menu [class.collapsed]="isCollapsed && (!isHovered || isMobile)"
      [isCollapsed]="isCollapsed && (!isHovered || isMobile)"></app-admin-layout-sidebar-menu>
    </aside>
  `, 
})
export class AdminLayoutSidebarComponent {
  @Input() isCollapsed = false;
  @Input() isMobile = false;
  @Input() isHovered = false;
  @Output() hover = new EventEmitter<boolean>();

  onHover(isHovered: boolean) {
    if (!this.isMobile) {
      this.hover.emit(isHovered);
    }
  }
}