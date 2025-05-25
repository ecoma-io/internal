import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title justify-center text-2xl font-bold mb-6">Create Account</h2>
          
          <form (ngSubmit)="onSubmit()">
            <div class="form-control">
              <label class="label" for="fullName">
                <span class="label-text">Full Name</span>
              </label>
              <input id="fullName" type="text" placeholder="John Doe" class="input input-bordered" required />
            </div>

            <div class="form-control mt-4">
              <label class="label" for="email">
                <span class="label-text">Email</span>
              </label>
              <input id="email" type="email" placeholder="your@email.com" class="input input-bordered" required />
            </div>
            
            <div class="form-control mt-4">
              <label class="label" for="password">
                <span class="label-text">Password</span>
              </label>
              <input id="password" type="password" placeholder="••••••••" class="input input-bordered" required />
            </div>

            <div class="form-control mt-4">
              <label class="label" for="confirmPassword">
                <span class="label-text">Confirm Password</span>
              </label>
              <input id="confirmPassword" type="password" placeholder="••••••••" class="input input-bordered" required />
            </div>

            <div class="form-control mt-6">
              <button class="btn btn-primary">Create Account</button>
            </div>
          </form>

          <p class="text-center mt-4">
            Already have an account? 
            <a routerLink="/auth/login" class="link link-primary">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  onSubmit() {
    // Handle registration logic here
  }
}