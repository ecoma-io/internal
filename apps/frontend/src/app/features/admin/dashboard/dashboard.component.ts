import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <div class="flex gap-3">
          <button class="btn btn-sm">Last 7 Days</button>
          <button class="btn btn-primary btn-sm">Export Report</button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="stats shadow-lg bg-base-100">
          <div class="stat">
            <div class="stat-figure text-primary">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="text-primary text-lg">👥</span>
              </div>
            </div>
            <div class="stat-title text-sm">Total Users</div>
            <div class="stat-value text-2xl">1,200</div>
            <div class="stat-desc text-success flex items-center gap-1 text-sm">
              <span>↑</span> 400 (30%)
            </div>
          </div>
        </div>

        <div class="stats shadow-lg bg-base-100">
          <div class="stat">
            <div class="stat-figure text-secondary">
              <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <span class="text-secondary text-lg">🆕</span>
              </div>
            </div>
            <div class="stat-title text-sm">New Users</div>
            <div class="stat-value text-2xl">120</div>
            <div class="stat-desc text-success flex items-center gap-1 text-sm">
              <span>↑</span> 40 (40%)
            </div>
          </div>
        </div>

        <div class="stats shadow-lg bg-base-100">
          <div class="stat">
            <div class="stat-figure text-accent">
              <div class="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <span class="text-accent text-lg">📦</span>
              </div>
            </div>
            <div class="stat-title text-sm">Orders</div>
            <div class="stat-value text-2xl">2,400</div>
            <div class="stat-desc text-success flex items-center gap-1 text-sm">
              <span>↑</span> 800 (50%)
            </div>
          </div>
        </div>

        <div class="stats shadow-lg bg-base-100">
          <div class="stat">
            <div class="stat-figure text-success">
              <div class="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <span class="text-success text-lg">💰</span>
              </div>
            </div>
            <div class="stat-title text-sm">Revenue</div>
            <div class="stat-value text-2xl">$12,000</div>
            <div class="stat-desc text-success flex items-center gap-1 text-sm">
              <span>↑</span> $4,000 (50%)
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activity -->
        <div class="card bg-base-100 shadow-lg lg:col-span-2">
          <div class="card-body">
            <h2 class="card-title text-lg mb-4">Recent Activity</h2>
            <div class="overflow-x-auto">
              <table class="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="flex items-center gap-2">
                      <div class="avatar">
                        <div class="w-8 h-8 rounded-full">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User" />
                        </div>
                      </div>
                      <span>John Doe</span>
                    </td>
                    <td>Created new post</td>
                    <td>2 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="flex items-center gap-2">
                      <div class="avatar">
                        <div class="w-8 h-8 rounded-full">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" alt="User" />
                        </div>
                      </div>
                      <span>Jane Smith</span>
                    </td>
                    <td>Updated profile</td>
                    <td>5 minutes ago</td>
                  </tr>
                  <tr>
                    <td class="flex items-center gap-2">
                      <div class="avatar">
                        <div class="w-8 h-8 rounded-full">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" alt="User" />
                        </div>
                      </div>
                      <span>Mike Johnson</span>
                    </td>
                    <td>Deleted comment</td>
                    <td>10 minutes ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg mb-4">Quick Actions</h2>
            <div class="space-y-4">
              <button class="btn btn-primary w-full">
                Create New Post
              </button>
              <button class="btn btn-outline w-full">
                Manage Users
              </button>
              <button class="btn btn-outline w-full">
                View Reports
              </button>
              <button class="btn btn-outline w-full">
                System Settings
              </button>
            </div>
          </div>
        </div>

        <!-- System Status -->
        <div class="card bg-base-100 shadow-lg lg:col-span-2">
          <div class="card-body">
            <h2 class="card-title text-lg mb-4">System Status</h2>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm">CPU Usage</span>
                  <span class="text-sm">65%</span>
                </div>
                <progress class="progress progress-primary w-full" value="65" max="100"></progress>
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm">Memory Usage</span>
                  <span class="text-sm">45%</span>
                </div>
                <progress class="progress progress-secondary w-full" value="45" max="100"></progress>
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm">Storage Usage</span>
                  <span class="text-sm">80%</span>
                </div>
                <progress class="progress progress-accent w-full" value="80" max="100"></progress>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body">
            <h2 class="card-title text-lg mb-4">Notifications</h2>
            <div class="space-y-4">
              <div class="alert alert-info">
                <span>System update scheduled for tomorrow</span>
              </div>
              <div class="alert alert-warning">
                <span>Storage space running low</span>
              </div>
              <div class="alert alert-success">
                <span>Backup completed successfully</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}