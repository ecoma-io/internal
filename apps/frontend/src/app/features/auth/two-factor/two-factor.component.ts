import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-factor',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title justify-center text-2xl font-bold mb-6">Two-Factor Authentication</h2>
          
          <div class="tabs tabs-boxed justify-center mb-6" role="tablist">
            <button 
              class="tab" 
              [class.tab-active]="method === 'mobile'" 
              (click)="method = 'mobile'"
              (keydown.enter)="method = 'mobile'"
              role="tab"
              [attr.aria-selected]="method === 'mobile'"
              tabindex="0">
              Mobile
            </button>
            <button 
              class="tab" 
              [class.tab-active]="method === 'email'" 
              (click)="method = 'email'"
              (keydown.enter)="method = 'email'"
              role="tab"
              [attr.aria-selected]="method === 'email'"
              tabindex="0">
              Email
            </button>
          </div>

          <form (ngSubmit)="onSubmit()">
            <div class="form-control">
              <label class="label" for="verificationCode">
                <span class="label-text">Enter Code</span>
              </label>
              <input 
                id="verificationCode"
                type="text" 
                placeholder="000000" 
                class="input input-bordered text-center text-2xl tracking-widest" 
                maxlength="6" 
                required />
            </div>

            <div class="form-control mt-6">
              <button class="btn btn-primary" routerLink="/profile">Verify</button>
            </div>
          </form>

          <div class="text-center mt-4">
            <button class="btn btn-link">Resend Code</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TwoFactorComponent {
  method: 'mobile' | 'email' = 'mobile';

  onSubmit() {
    // Handle 2FA verification logic here
  }
}