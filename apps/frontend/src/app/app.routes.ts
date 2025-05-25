import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/home-layout/home-layout.component').then(m => m.HomeLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) }
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: 'forgot-password', loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: 'reset-password', loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
      { path: 'oauth-consent', loadComponent: () => import('./features/auth/oauth-consent/oauth-consent.component').then(m => m.OAuthConsentComponent) },
      { path: '2fa', loadComponent: () => import('./features/auth/two-factor/two-factor.component').then(m => m.TwoFactorComponent) }
    ]
  },
  {
    path: 'account',
    loadComponent: () => import('./layouts/account-layout/account-layout.component').then(m => m.AccountLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/account/account.component').then(m => m.AccountComponent) }
    ]
  },
  {
    path: 'app',
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'chat', loadComponent: () => import('./features/admin/chat/chat.component').then(m => m.ChatComponent) },
      { path: 'users', loadComponent: () => import('./features/admin/users/users.component').then(m => m.UsersComponent) },
      { path: 'content', loadComponent: () => import('./features/admin/content/content.component').then(m => m.ContentComponent) },
      { path: 'settings', loadComponent: () => import('./features/admin/settings/settings.component').then(m => m.SettingsComponent) }
    ]
  }
];
