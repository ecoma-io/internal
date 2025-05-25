import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title justify-center text-2xl font-bold mb-6">Welcome Back</h2>
          
          <form (ngSubmit)="onSubmit()">
            <div class="form-control">
              <label class="label" for="email">
                <span class="label-text">Email</span>
              </label>
              <input type="email" id="email" placeholder="your@email.com" class="input input-bordered" required />
            </div>
            
            <div class="form-control mt-4">
              <label class="label" for="password">
                <span class="label-text">Password</span>
                <a routerLink="/auth/forgot-password" class="label-text-alt link link-primary">Forgot password?</a>
              </label>
              <input type="password" id="password" placeholder="••••••••" class="input input-bordered" required />
            </div>

            <div class="form-control mt-6">
              <button routerLink="/auth/2fa"  class="btn btn-primary">Sign In</button>
            </div>

            <div class="divider">OR</div>

            <div class="form-control">
              <button type="button" class="btn btn-outline">
                Continue with Google
              </button>
            </div>
          </form>

          <p class="text-center mt-4">
            Don't have an account? 
            <a routerLink="/auth/register" class="link link-primary">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  onSubmit() {
    // Handle login logic here
  }
}