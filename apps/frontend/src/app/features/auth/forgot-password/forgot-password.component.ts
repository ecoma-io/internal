import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title justify-center text-2xl font-bold mb-6">Recover Account</h2>
          
          <form (ngSubmit)="onSubmit()">
            <div class="form-control">
              <label class="label" for="email">
                <span class="label-text">Email</span>
              </label>
              <input type="email" id="email" placeholder="your@email.com" class="input input-bordered" required />
            </div>

            <div class="form-control mt-6">
              <button class="btn btn-primary">Send Recovery Link</button>
            </div>
          </form>

          <p class="text-center mt-4">
            Remember your password? 
            <a routerLink="/auth/login" class="link link-primary">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  onSubmit() {
    // Handle forgot password logic here
  }
}