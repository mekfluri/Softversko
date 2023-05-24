import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, finalize } from "rxjs";
import { LoadingService } from "../services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    private count = 0;

    constructor(private loadService: LoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method == "GET") {
            if (this.count == 0) {
                this.loadService.setStatus(true);
            }
            this.count++;
            return next.handle(req).pipe(
                finalize(() => {
                    this.count--;
                    if (this.count == 0) {
                        this.loadService.setStatus(false);
                    }
                })
            );
        }
        else {
            return next.handle(req);
        }
    }

}