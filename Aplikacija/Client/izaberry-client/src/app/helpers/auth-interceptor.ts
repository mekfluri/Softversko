import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtHelper = new JwtHelperService();
        const token = localStorage.getItem("authToken");
        if (token) {
            if (jwtHelper.isTokenExpired(token)) {
                const decoded = jwtHelper.decodeToken(token);
                localStorage.removeItem("authToken");
                if(decoded.perm == "ADMIN") {
                    this.router.navigateByUrl("admin/login");
                }
                else {
                    this.router.navigateByUrl("login");
                }
            }
            else {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
        }
        return next.handle(req);
    }

}