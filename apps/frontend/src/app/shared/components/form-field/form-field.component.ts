import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-control w-full">
      <label class="label" [attr.for]="id">
        <span class="label-text">{{ label }}</span>
        <span class="label-text-alt" *ngIf="control?.errors && control?.touched">
          <span class="text-error">{{ getErrorMessage() }}</span>
        </span>
      </label>
      
      <div class="relative">
        <ng-content></ng-content>
        
        <div class="absolute inset-y-0 right-0 flex items-center pr-3" *ngIf="control">
          <svg *ngIf="control.valid && control.touched" class="h-5 w-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg *ngIf="control.errors && control.touched" class="h-5 w-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
      </div>
      
      <div class="mt-1" *ngIf="showPasswordStrength && control?.value">
        <div class="h-1 w-full bg-base-200 rounded">
          <div
            class="h-1 rounded transition-all duration-300"
            [ngStyle]="{
              'width': (passwordStrength.score * 25) + '%',
              'background-color': passwordStrength.color
            }"
          ></div>
        </div>
        <p class="text-xs mt-1" [style.color]="passwordStrength.color">
          {{ passwordStrength.message }}
        </p>
      </div>
    </div>
  `
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() id!: string;
  @Input() control?: AbstractControl;
  @Input() showPasswordStrength = false;

  get passwordStrength() {
    if (!this.control?.value) {
      return { score: 0, color: '#e11d48', message: 'Very Weak' };
    }

    const result = zxcvbn(this.control.value);
    const colors = ['#e11d48', '#f97316', '#eab308', '#84cc16', '#22c55e'];
    const messages = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

    return {
      score: result.score,
      color: colors[result.score],
      message: messages[result.score]
    };
  }

  getErrorMessage(): string {
    if (!this.control?.errors || !this.control?.touched) return '';

    const errors = this.control.errors;
    
    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Invalid email address';
    if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}`;
    if (errors['weakPassword']) return 'Password is too weak';
    if (errors['invalidPhone']) return 'Invalid phone number';
    if (errors['invalidUsername']) return 'Username must be 3-20 alphanumeric characters';
    
    return 'Invalid input';
  }
}