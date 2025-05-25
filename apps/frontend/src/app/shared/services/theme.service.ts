import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, effect, signal } from '@angular/core';
import { WA_WINDOW } from '@ng-web-apis/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Signal lưu trạng thái theme hiện tại
  private $theme = signal<Theme>(this.getSystemTheme());

  // Public signal để component subscribe
  readonly theme = this.$theme.asReadonly();
  constructor(
    @Inject(WA_WINDOW) private readonly window: Window,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    // Tự động cập nhật attribute khi theme thay đổi
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.body.setAttribute('data-theme', this.$theme());
      }
    });
  }


  // Lấy theme hệ điều hành
  private getSystemTheme(): Theme {
    if (!isPlatformBrowser(this.platformId) || !this.window?.matchMedia) return 'light';
    return this.window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Đổi theme
  toggleTheme() {
    this.setTheme(this.$theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme) {
    this.$theme.set(theme);
  }
}
