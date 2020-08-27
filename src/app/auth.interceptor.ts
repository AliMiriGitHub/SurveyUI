import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req, next) {
        var token = localStorage.getItem("client-token");
        var authRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(authRequest);
    }

}