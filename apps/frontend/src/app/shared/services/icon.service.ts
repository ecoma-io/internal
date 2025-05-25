import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { WA_LOCATION } from "@ng-web-apis/common";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoggerService } from "./logger.service";

@Injectable({
  providedIn: "root",
})
export class IconService {
  private sourceMap: { [source: string]: BehaviorSubject<string> } = {};
  private logger: LoggerService;

  constructor(
    private http: HttpClient,
    @Inject(WA_LOCATION) private location: Location,
    loggerService: LoggerService
  ) {
    this.logger = loggerService.create(IconService.name);
  }

  getSvg(path: string): Observable<string> {
    path = '/icons' + path;
    this.logger.debug("Getting svg source", { src: path });
    if (!this.sourceMap[path]) {
      this.sourceMap[path] = new BehaviorSubject<string>(
        '<div class="animate-pulse bg-base-300/50"></div>'
      );
      this.loadSvg(path);
    }

    return this.sourceMap[path].asObservable();
  }

  private loadSvg(path: string) {
    this.http
      .get(path, {
        observe: "response",
        responseType: "text",
      })
      .pipe(map((response) => response.body ?? ""))
      .subscribe((svg) => {
        this.sourceMap[path].next(svg);
      });
  }
}
