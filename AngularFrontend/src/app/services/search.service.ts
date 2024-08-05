import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit, inject } from "@angular/core";
import { TokenService } from "./token.service";
import { BehaviorSubject, Observable, catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(private http: HttpClient) {}

    private searchSubject = new BehaviorSubject<string>('');
    search$ = this.searchSubject.asObservable();

    setSearchTerm(term: string) {
        this.searchSubject.next(term);
    }
}
