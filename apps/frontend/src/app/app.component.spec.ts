import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { APP_VERSION } from "../tokens";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      providers: [
        { provide: APP_VERSION, useValue: "test" }, // <--- Cách phổ biến
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  it("should initialized", () => {
    expect(fixture).toBeDefined();
  });
});
