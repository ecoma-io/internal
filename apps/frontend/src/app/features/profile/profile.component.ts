import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-base-200 py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Sidebar -->
          <div class="card bg-base-100 shadow-xl h-fit">
            <div class="card-body">
              <div class="flex flex-col items-center">
                <div class="avatar">
                  <div class="w-24 rounded-full">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Profile" />
                  </div>
                </div>
                <h2 class="text-xl font-bold mt-4">John Doe</h2>
                <p class="text-sm opacity-70">john&#64;example.com</p>
              </div>
              
              <div class="divider"></div>
              
              <ul class="menu bg-base-100 rounded-box">
                <li>
                  <a [class.active]="activeTab === 'profile'" 
                     (click)="activeTab = 'profile'"
                     (keydown.enter)="activeTab = 'profile'"
                     tabindex="0"
                     role="button">
                    Profile Information
                  </a>
                </li>
                <li>
                  <a [class.active]="activeTab === 'security'" 
                     (click)="activeTab = 'security'"
                     (keydown.enter)="activeTab = 'security'"
                     tabindex="0"
                     role="button">
                    Security
                  </a>
                </li>
                <li>
                  <a [class.active]="activeTab === 'sessions'" 
                     (click)="activeTab = 'sessions'"
                     (keydown.enter)="activeTab = 'sessions'"
                     tabindex="0"
                     role="button">
                    Active Sessions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Main Content -->
          <div class="md:col-span-2">
            <!-- Profile Information -->
            <div class="card bg-base-100 shadow-xl" *ngIf="activeTab === 'profile'">
              <div class="card-body">
                <h2 class="card-title mb-6">Profile Information</h2>
                
                <form (ngSubmit)="onSubmit()">
                  <div class="form-control">
                    <label class="label" for="fullName">
                      <span class="label-text">Full Name</span>
                    </label>
                    <input id="fullName" type="text" placeholder="John Doe" class="input input-bordered" />
                  </div>

                  <div class="form-control mt-4">
                    <label class="label" for="email">
                      <span class="label-text">Email</span>
                    </label>
                    <input id="email" type="email" placeholder="john&#64;example.com" class="input input-bordered" />
                  </div>

                  <div class="form-control mt-4">
                    <label class="label" for="phone">
                      <span class="label-text">Phone</span>
                    </label>
                    <input id="phone" type="tel" placeholder="+1234567890" class="input input-bordered" />
                  </div>

                  <div class="form-control mt-6">
                    <button class="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Security -->
            <div class="card bg-base-100 shadow-xl" *ngIf="activeTab === 'security'">
              <div class="card-body">
                <h2 class="card-title mb-6">Security Settings</h2>
                
                <div class="space-y-6">
                  <!-- Change Password -->
                  <div class="border-b pb-6">
                    <h3 class="text-lg font-semibold mb-4">Change Password</h3>
                    <form (ngSubmit)="onChangePassword()">
                      <div class="form-control">
                        <label class="label" for="currentPassword">
                          <span class="label-text">Current Password</span>
                        </label>
                        <input id="currentPassword" type="password" class="input input-bordered" />
                      </div>

                      <div class="form-control mt-4">
                        <label class="label" for="newPassword">
                          <span class="label-text">New Password</span>
                        </label>
                        <input id="newPassword" type="password" class="input input-bordered" />
                      </div>

                      <div class="form-control mt-4">
                        <label class="label" for="confirmNewPassword">
                          <span class="label-text">Confirm New Password</span>
                        </label>
                        <input id="confirmNewPassword" type="password" class="input input-bordered" />
                      </div>

                      <div class="mt-4">
                        <button class="btn btn-primary">Update Password</button>
                      </div>
                    </form>
                  </div>

                  <!-- 2FA -->
                  <div class="border-b pb-6">
                    <div class="flex justify-between items-center mb-4">
                      <div>
                        <h3 class="text-lg font-semibold">Two-Factor Authentication</h3>
                        <p class="text-sm opacity-70">Add an extra layer of security to your account</p>
                      </div>
                      <input type="checkbox" class="toggle toggle-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Active Sessions -->
            <div class="card bg-base-100 shadow-xl" *ngIf="activeTab === 'sessions'">
              <div class="card-body">
                <h2 class="card-title mb-6">Active Sessions</h2>
                
                <div class="space-y-4">
                  <!-- Current Session -->
                  <div class="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <p class="font-semibold">Current Session</p>
                      <p class="text-sm opacity-70">Windows • Chrome • New York, USA</p>
                    </div>
                    <span class="badge badge-primary">Active</span>
                  </div>

                  <!-- Other Sessions -->
                  <div class="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <p class="font-semibold">Mobile App</p>
                      <p class="text-sm opacity-70">iOS • iPhone • Los Angeles, USA</p>
                    </div>
                    <button class="btn btn-sm btn-ghost">Logout</button>
                  </div>

                  <div class="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <p class="font-semibold">Tablet</p>
                      <p class="text-sm opacity-70">iPadOS • Safari • Miami, USA</p>
                    </div>
                    <button class="btn btn-sm btn-ghost">Logout</button>
                  </div>
                </div>

                <div class="mt-6">
                  <button class="btn btn-error btn-outline">Logout from all devices</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {
  activeTab: 'profile' | 'security' | 'sessions' = 'profile';

  onSubmit() {
    // Handle profile update logic here
  }

  onChangePassword() {
    // Handle password change logic here
  }
}