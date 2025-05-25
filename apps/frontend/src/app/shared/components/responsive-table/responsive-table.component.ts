import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IColumnDefinition, IQuickActionDefinition } from '../../interfaces/table.interfaces';

@Component({
  selector: 'app-responsive-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Desktop View -->
    <div class="hidden md:block">
      <!-- Bulk Actions Toolbar -->
      <div class="sticky top-0 z-10 bg-base-100 shadow-lg transition-all"
           [class.translate-y-0]="selectedRows.size > 0"
           [class.translate-y-[-100%)]="selectedRows.size === 0">
        <div class="flex items-center justify-between p-4">
          <span class="text-sm font-medium">
            {{ selectedRows.size }} items selected
          </span>
          <div class="flex gap-2">
            <button class="btn btn-error btn-sm" (click)="clearSelection()">
              Clear Selection
            </button>
            <!-- Add your bulk actions here -->
          </div>
        </div>
      </div>

      <!-- Table Controls -->
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-4">
          <div class="form-control">
            <select class="select select-bordered select-sm" 
                    [ngModel]="currentItemsPerPage"
                    (ngModelChange)="onItemsPerPageChange($event)">
              <option *ngFor="let option of itemsPerPageOptions" [value]="option">
                {{ option }} per page
              </option>
            </select>
          </div>
          <button class="btn btn-ghost btn-sm" (click)="openColumnManager()">
            Manage Columns
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th class="w-4">
                <input type="checkbox"
                       class="checkbox checkbox-sm"
                       [checked]="isAllSelected()"
                       (change)="toggleSelectAll()"
                       [indeterminate]="hasPartialSelection()">
              </th>
              <th *ngFor="let col of visibleColumns">
                {{ col.label }}
              </th>
              <th *ngIf="quickActions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of data">
              <td>
                <input type="checkbox"
                       class="checkbox checkbox-sm"
                       [checked]="isSelected(item)"
                       (change)="toggleSelect(item)">
              </td>
              <td *ngFor="let col of visibleColumns">
                <ng-container *ngTemplateOutlet="
                  col.template || defaultCellTemplate;
                  context: { $implicit: item, column: col }
                "></ng-container>
              </td>
              <td *ngIf="quickActions">
                <div class="dropdown dropdown-end">
                  <button tabindex="0" class="btn btn-ghost btn-xs">
                    •••
                  </button>
                  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li *ngFor="let action of quickActions">
                      <button (click)="action.action(item)"
                              *ngIf="!action.visible || action.visible(item)">
                        {{ action.label }}
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden">
      <div class="space-y-4">
        <!-- Mobile Controls -->
        <div class="flex items-center justify-between p-4">
          <div class="form-control">
            <select class="select select-bordered select-sm"
                    [ngModel]="currentItemsPerPage"
                    (ngModelChange)="onItemsPerPageChange($event)">
              <option *ngFor="let option of itemsPerPageOptions" [value]="option">
                {{ option }} per page
              </option>
            </select>
          </div>
        </div>

        <!-- Mobile Cards -->
        <div class="space-y-4 p-4">
          <div *ngFor="let item of data"
               class="card bg-base-100 shadow-lg"
               [class.border-primary]="isSelected(item)"
               (appLongPress)="onLongPress(item)">
            <div class="card-body p-4">
              <!-- Selection Checkbox -->
              <div class="absolute top-2 right-2">
                <input type="checkbox"
                       class="checkbox checkbox-sm"
                       [checked]="isSelected(item)"
                       (change)="toggleSelect(item)">
              </div>

              <!-- Visible Fields -->
              <div class="space-y-2">
                <ng-container *ngFor="let col of mobileVisibleColumns">
                  <div class="flex justify-between">
                    <span class="text-sm opacity-70">{{ col.label }}</span>
                    <ng-container *ngTemplateOutlet="
                      col.template || defaultCellTemplate;
                      context: { $implicit: item, column: col }
                    "></ng-container>
                  </div>
                </ng-container>
              </div>

              <!-- Expandable Content -->
              <div class="collapse" [class.collapse-open]="expandedItems.has(item)">
                <button class="collapse-title pl-0 text-sm" (click)="toggleExpand(item)">
                  {{ expandedItems.has(item) ? 'Show less' : 'Show more' }}
                </button>
                <div class="collapse-content pl-0">
                  <div class="space-y-2">
                    <ng-container *ngFor="let col of mobileHiddenColumns">
                      <div class="flex justify-between">
                        <span class="text-sm opacity-70">{{ col.label }}</span>
                        <ng-container *ngTemplateOutlet="
                          col.template || defaultCellTemplate;
                          context: { $implicit: item, column: col }
                        "></ng-container>
                      </div>
                    </ng-container>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div *ngIf="quickActions" class="card-actions justify-end mt-4">
                <div class="dropdown dropdown-end">
                  <button tabindex="0" class="btn btn-ghost btn-xs">
                    Actions
                  </button>
                  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li *ngFor="let action of quickActions">
                      <button (click)="action.action(item)"
                              *ngIf="!action.visible || action.visible(item)">
                        {{ action.label }}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between p-4">
      <span class="text-sm">
        Showing {{ paginationStart }} to {{ paginationEnd }} of {{ totalItems }}
      </span>
      <div class="join">
        <button class="join-item btn btn-sm"
                [disabled]="currentPage === 1"
                (click)="onPageChange(currentPage - 1)">
          Previous
        </button>
        <button class="join-item btn btn-sm"
                [disabled]="currentPage >= totalPages"
                (click)="onPageChange(currentPage + 1)">
          Next
        </button>
      </div>
    </div>

    <!-- Default Cell Template -->
    <ng-template #defaultCellTemplate let-item let-column="column">
      {{ item[column.key] }}
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class ResponsiveTableComponent {
  @Input() data: any[] = [];
  @Input() columnDefinitions: IColumnDefinition[] = [];
  @Input() totalItems = 0;
  @Input() itemsPerPageOptions: number[] = [10, 20, 50, 100];
  @Input() currentPage = 1;
  @Input() currentItemsPerPage = 10;
  @Input() quickActions?: IQuickActionDefinition[];

  @Output() columnVisibilityChange = new EventEmitter<IColumnDefinition[]>();
  @Output() columnOrderChange = new EventEmitter<string[]>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  @Output() selectedRowsChange = new EventEmitter<any[]>();

  selectedRows = new Set<any>();
  expandedItems = new Set<any>();
  
  get visibleColumns(): IColumnDefinition[] {
    return this.columnDefinitions.filter(col => col.visible !== false);
  }

  get mobileVisibleColumns(): IColumnDefinition[] {
    return this.columnDefinitions.filter(col => col.mobileVisible !== false);
  }

  get mobileHiddenColumns(): IColumnDefinition[] {
    return this.columnDefinitions.filter(col => 
      col.visible !== false && col.mobileVisible === false
    );
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.currentItemsPerPage);
  }

  get paginationStart(): number {
    return (this.currentPage - 1) * this.currentItemsPerPage + 1;
  }

  get paginationEnd(): number {
    return Math.min(this.currentPage * this.currentItemsPerPage, this.totalItems);
  }

  isSelected(item: any): boolean {
    return this.selectedRows.has(item);
  }

  isAllSelected(): boolean {
    return this.data.length > 0 && this.data.every(item => this.selectedRows.has(item));
  }

  hasPartialSelection(): boolean {
    const selectedCount = this.data.filter(item => this.selectedRows.has(item)).length;
    return selectedCount > 0 && selectedCount < this.data.length;
  }

  toggleSelect(item: any): void {
    if (this.selectedRows.has(item)) {
      this.selectedRows.delete(item);
    } else {
      this.selectedRows.add(item);
    }
    this.selectedRowsChange.emit(Array.from(this.selectedRows));
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.data.forEach(item => this.selectedRows.delete(item));
    } else {
      this.data.forEach(item => this.selectedRows.add(item));
    }
    this.selectedRowsChange.emit(Array.from(this.selectedRows));
  }

  clearSelection(): void {
    this.selectedRows.clear();
    this.selectedRowsChange.emit([]);
  }

  toggleExpand(item: any): void {
    if (this.expandedItems.has(item)) {
      this.expandedItems.delete(item);
    } else {
      this.expandedItems.add(item);
    }
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  onItemsPerPageChange(value: number): void {
    this.itemsPerPageChange.emit(value);
  }

  onLongPress(item: any): void {
    this.toggleSelect(item);
  }

  openColumnManager(): void {
    // Implement column management modal logic
  }
}