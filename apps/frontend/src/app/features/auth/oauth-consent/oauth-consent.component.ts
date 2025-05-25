import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-oauth-consent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title justify-center text-2xl font-bold mb-6">Authorize Access</h2>
          
          <div class="text-center mb-6">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=App" alt="App" />
              </div>
            </div>
            <p class="mt-4 text-lg font-semibold">Third-party App</p>
          </div>

          <div class="bg-base-200 rounded-lg p-4 mb-6">
            <p class="font-medium mb-2">This app will be able to:</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Read your basic profile</li>
              <li>Access your email address</li>
              <li>View your account settings</li>
            </ul>
          </div>

          <div class="space-y-4">
            <button class="btn btn-primary w-full">Authorize Access</button>
            <button class="btn btn-ghost w-full">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OAuthConsentComponent {}