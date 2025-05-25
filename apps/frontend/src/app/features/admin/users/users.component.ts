import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, IUser } from './services/user.service';
import { IColumnDefinition, IQuickActionDefinition } from '../../../shared/interfaces/table.interfaces';
import { ResponsiveTableComponent } from '../../../shared/components/responsive-table/responsive-table.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ResponsiveTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">User Management</h1>
        <button class="btn btn-primary">Add User</button>
      </div>

      <!-- Bulk Actions -->
      <div class="flex gap-2" *ngIf="selectedUserIds.length > 0">
        <button class="btn btn-error btn-sm" (click)="deleteSelected()">
          Delete Selected
        </button>
        <div class="dropdown dropdown-end">
          <button tabindex="0" class="btn btn-outline btn-sm">
            Update Status
          </button>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a (click)="updateSelectedStatus('active')" (keyup.enter)="updateSelectedStatus('active')" (keyup.space)="updateSelectedStatus('active')" tabindex="0" role="button">Set Active</a></li>
            <li><a (click)="updateSelectedStatus('inactive')" (keyup.enter)="updateSelectedStatus('inactive')" (keyup.space)="updateSelectedStatus('inactive')" tabindex="0" role="button">Set Inactive</a></li>
            <li><a (click)="updateSelectedStatus('pending')" (keyup.enter)="updateSelectedStatus('pending')" (keyup.space)="updateSelectedStatus('pending')" tabindex="0" role="button">Set Pending</a></li>
          </ul>
        </div>
      </div>

      <!-- Table -->
      <app-responsive-table
        [data]="users"
        [columnDefinitions]="columns"
        [totalItems]="totalItems"
        [currentPage]="currentPage"
        [currentItemsPerPage]="itemsPerPage"
        [itemsPerPageOptions]="[10, 25, 50, 100]"
        [quickActions]="quickActions"
        (pageChange)="onPageChange($event)"
        (itemsPerPageChange)="onItemsPerPageChange($event)"
        (selectedRowsChange)="onSelectionChange($event)"
        (columnVisibilityChange)="onColumnVisibilityChange($event)"
        (columnOrderChange)="onColumnOrderChange($event)">
        
        <!-- Status Cell Template -->
        <ng-template #statusTemplate let-user>
          <div class="badge" [ngClass]="{
            'badge-success': user.status === 'active',
            'badge-error': user.status === 'inactive',
            'badge-warning': user.status === 'pending'
          }">
            {{ user.status }}
          </div>
        </ng-template>

        <!-- Role Cell Template -->
        <ng-template #roleTemplate let-user>
          <div class="badge badge-outline">{{ user.role }}</div>
        </ng-template>

        <!-- Last Login Cell Template -->
        <ng-template #lastLoginTemplate let-user>
          {{ user.lastLogin | date:'medium' }}
        </ng-template>
      </app-responsive-table>
    </div>
  `
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('roleTemplate') roleTemplate!: TemplateRef<any>;
  @ViewChild('lastLoginTemplate') lastLoginTemplate!: TemplateRef<any>;

  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  selectedUserIds: string[] = [];
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 10;

  columns: IColumnDefinition[] = [
    { key: 'name', label: 'Name', mandatory: true, mobileVisible: true },
    { key: 'email', label: 'Email', mandatory: true, mobileVisible: true },
    { key: 'role', label: 'Role', mobileVisible: false },
    { key: 'status', label: 'Status', mobileVisible: true },
    { key: 'lastLogin', label: 'Last Login', mobileVisible: false }
  ];

  quickActions: IQuickActionDefinition[] = [
    {
      label: 'View Details',
      action: (user: IUser) => this.viewUserDetails(user)
    },
    {
      label: 'Edit',
      action: (user: IUser) => this.editUser(user)
    },
    {
      label: 'Delete',
      action: (user: IUser) => this.deleteUser(user.id)
    }
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadSavedSettings();
  }

  ngAfterViewInit() {
    // Update column templates after view initialization
    this.columns = this.columns.map(col => {
      switch (col.key) {
        case 'status':
          return { ...col, template: this.statusTemplate };
        case 'role':
          return { ...col, template: this.roleTemplate };
        case 'lastLogin':
          return { ...col, template: this.lastLoginTemplate };
        default:
          return col;
      }
    });
  }

  private loadUsers() {
    this.userService.getUsers(this.currentPage, this.itemsPerPage)
      .subscribe(response => {
        this.users = response.data;
        this.totalItems = response.total;
      });
  }

  private loadSavedSettings() {
    const settings = localStorage.getItem('userTableSettings');
    if (settings) {
      const { itemsPerPage, columnVisibility, columnOrder } = JSON.parse(settings);
      this.itemsPerPage = itemsPerPage || 10;
      
      if (columnVisibility) {
        this.columns = this.columns.map(col => ({
          ...col,
          visible: columnVisibility[col.key] ?? true
        }));
      }

      if (columnOrder) {
        this.columns.sort((a, b) => 
          columnOrder.indexOf(a.key) - columnOrder.indexOf(b.key)
        );
      }
    }
  }

  private saveSettings() {
    const settings = {
      itemsPerPage: this.itemsPerPage,
      columnVisibility: Object.fromEntries(
        this.columns.map(col => [col.key, col.visible])
      ),
      columnOrder: this.columns.map(col => col.key)
    };
    localStorage.setItem('userTableSettings', JSON.stringify(settings));
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  onItemsPerPageChange(value: number): void {
    this.itemsPerPage = value;
    this.currentPage = 1;
    this.loadUsers();
    this.saveSettings();
  }

  onSelectionChange(users: IUser[]): void {
    this.selectedUserIds = users.map(user => user.id);
  }

  onColumnVisibilityChange(columns: IColumnDefinition[]): void {
    this.columns = columns;
    this.saveSettings();
  }

  onColumnOrderChange(order: string[]): void {
    this.columns = order.map(key => 
      this.columns.find(col => col.key === key)!
    );
    this.saveSettings();
  }

  deleteSelected() {
    if (confirm(`Are you sure you want to delete ${this.selectedUserIds.length} selected users?`)) {
      this.userService.deleteUsers(this.selectedUserIds).subscribe(() => {
        this.loadUsers();
        this.selectedUserIds = [];
      });
    }
  }

  updateSelectedStatus(status: IUser['status']) {
    this.userService.updateUserStatus(this.selectedUserIds, status).subscribe(() => {
      this.loadUsers();
    });
  }

  viewUserDetails(user: IUser) {
    // console.log('View user details', user);
  }

  editUser(user: IUser) {
    // console.log('Edit user', user);
  }

  deleteUser(userId: string) {
    // Find the user by id to display a confirmation message
    const userToDelete = this.users.find(user => user.id === userId);
    if (confirm(`Are you sure you want to delete user ${userToDelete?.name}?`)) {
      this.userService.deleteUsers([userId]).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  onRowSelect(selected: string[]) {
    this.selectedUserIds = selected;
  }

  onSearch(searchTerm: string) {
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}