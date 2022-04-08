import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
        map( res => {
            return res 
        }),
        
        catchError(err => { 
            if (err.status === 403) {
                // auto logout if 403 response returned from api
                this.accountService.logout();
            }

            const error = err.error || err.statusText;
            console.log(err);
            return throwError(error);
        }))
    }
}