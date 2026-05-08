var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let CyberShieldInterceptor = class CyberShieldInterceptor {
    constructor(platformId) {
        this.platformId = platformId;
    }
    intercept(request, next) {
        return next.handle(request).pipe(catchError((error) => {
            // Only run redirection logic if we are running in the browser
            if (isPlatformBrowser(this.platformId)) {
                if (error.status === 403 || error.status === 429) {
                    const data = error.error;
                    if (data && data.blocked && data.redirect) {
                        // Create a trap state in history to prevent the user from navigating back
                        window.history.replaceState({ cybershield_trap: true, redirect_url: data.redirect }, "");
                        // Redirect to the CyberShield block page
                        window.location.assign(data.redirect);
                    }
                }
            }
            return throwError(() => error);
        }));
    }
};
CyberShieldInterceptor = __decorate([
    Injectable(),
    __param(0, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [Object])
], CyberShieldInterceptor);
export { CyberShieldInterceptor };
//# sourceMappingURL=cybershield.interceptor.js.map