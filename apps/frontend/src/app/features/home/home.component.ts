import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-base-200">
      <!-- Hero Section -->
      <div class="hero min-h-[70vh] bg-base-100">
        <div class="hero-content text-center">
          <div class="max-w-3xl">
            <h1 class="text-5xl font-bold mb-8">Ecoma - Nền tảng SaaS Quản trị Vận hành</h1>
            <p class="text-xl mb-8">Giải pháp toàn diện cho doanh nghiệp thương mại điện tử của bạn</p>
            <div class="flex gap-4 justify-center">
              <a routerLink="/auth/register" class="btn btn-primary">Dùng thử miễn phí</a>
              <button class="btn btn-outline">Tìm hiểu thêm</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-20">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">Tính năng nổi bật</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title">Quản lý đơn hàng</h3>
                <p>Theo dõi và quản lý đơn hàng từ nhiều kênh bán hàng khác nhau một cách hiệu quả</p>
              </div>
            </div>
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title">Quản lý kho hàng</h3>
                <p>Kiểm soát tồn kho thời gian thực, tự động đồng bộ across các marketplace</p>
              </div>
            </div>
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title">Phân tích dữ liệu</h3>
                <p>Báo cáo chi tiết và insights giúp tối ưu hoạt động kinh doanh</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="bg-base-100 py-20">
        <div class="container mx-auto px-4">
          <div class="stats shadow w-full">
            <div class="stat place-items-center">
              <div class="stat-title">Khách hàng</div>
              <div class="stat-value">1,000+</div>
              <div class="stat-desc">Doanh nghiệp tin dùng</div>
            </div>
            <div class="stat place-items-center">
              <div class="stat-title">Đơn hàng</div>
              <div class="stat-value">2M+</div>
              <div class="stat-desc">Được xử lý mỗi tháng</div>
            </div>
            <div class="stat place-items-center">
              <div class="stat-title">Marketplace</div>
              <div class="stat-value">10+</div>
              <div class="stat-desc">Tích hợp sẵn sàng</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="py-20">
        <div class="container mx-auto px-4">
          <div class="card bg-primary text-primary-content">
            <div class="card-body text-center">
              <h2 class="card-title text-3xl justify-center mb-4">Sẵn sàng để phát triển?</h2>
              <p class="mb-6">Bắt đầu 14 ngày dùng thử miễn phí với đầy đủ tính năng</p>
              <div class="card-actions justify-center">
                <a routerLink="/auth/register" class="btn btn-outline btn-white">Bắt đầu ngay</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}