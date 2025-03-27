import { Component, Inject, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { APP_VERSION } from "../tokens";

@Component({
  imports: [RouterModule],
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  constructor(
    private metaService: Meta,
    @Inject(APP_VERSION) private appVersion: string
  ) {}

  ngOnInit(): void {
    // Gọi phương thức để thêm meta tag khi component khởi tạo
    this.addAppVersionMetaTag();
  }

  addAppVersionMetaTag(): void {
    // Kiểm tra xem meta tag đã tồn tại chưa để tránh thêm trùng lặp
    const existingMetaTag = this.metaService.getTag('name="version"');

    if (existingMetaTag) {
      // Nếu đã tồn tại, cập nhật content
      this.metaService.updateTag({ name: "version", content: this.appVersion });
    } else {
      // Nếu chưa tồn tại, thêm mới
      this.metaService.addTag({ name: "version", content: this.appVersion });
    }
  }
}
