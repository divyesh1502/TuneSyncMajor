// token.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private tokenKey = 'token';

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

    getToken(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return window.localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    setToken(token: string): void {
        if (isPlatformBrowser(this.platformId)) {
            window.localStorage.setItem(this.tokenKey, token);
        }
    }

    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.localStorage.clear();
            this.router.navigate(['/home']);
        }
    }

    isAuthenticated(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return !!this.getToken();
        }
        return false;
    }

    getUserName(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            const decodedToken = jwtDecode(this.getToken());
            return this.getUserDataFromToken(decodedToken).userName;
        }
        return null;
    }

    getUserImg(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            const decodedToken = jwtDecode(this.getToken());
            var fullPath = this.getUserDataFromToken(decodedToken).profileImage.split('\\');
            return fullPath[fullPath.length - 1];
        }
        return null;
    }

    getUserID(): number | null {
        if (isPlatformBrowser(this.platformId)) {
            const decodedToken = jwtDecode(this.getToken());
            return +this.getUserDataFromToken(decodedToken).id;
        }
        return null;
    }
    getUserRole(): number | null {
        if (isPlatformBrowser(this.platformId)) {
            const decodedToken = jwtDecode(this.getToken());
            return +this.getUserDataFromToken(decodedToken).role;
        }
        return null;
    }

    getUserDataFromToken(decodedToken: any): any {
        return {
            id: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            role: decodedToken['http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor'],
            userName: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            expire: decodedToken['exp'],
            profileImage: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/gender'],
        };
    }


}
