import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class CyberShieldInterceptor implements HttpInterceptor {
    private platformId;
    constructor(platformId: Object);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
//# sourceMappingURL=cybershield.interceptor.d.ts.map