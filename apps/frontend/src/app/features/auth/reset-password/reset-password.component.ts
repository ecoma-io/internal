import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title justify-center text-2xl font-bold mb-6">Reset Password</h2>
          
          <form (ngSubmit)="onSubmit()">
            <div class="form-control">
              <label class="label" for="newPassword">
                <span class="label-text">New Password</span>
              </label>
              <input id="newPassword" type="password" placeholder="••••••••" class="input input-bordered" required />
            </div>

            <div class="form-control mt-4">
              <label class="label" for="confirmNewPassword">
                <span class="label-text">Confirm New Password</span>
              </label>
              <input id="confirmNewPassword" type="password" placeholder="••••••••" class="input input-bordered" required />
            </div>

            <div class="form-control mt-6">
              <button class="btn btn-primary">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ResetPasswordComponent {
  onSubmit() {
    // Handle reset password logic here
  }
}