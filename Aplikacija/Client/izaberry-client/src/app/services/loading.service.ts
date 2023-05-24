import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading$ = new ReplaySubject<boolean>(1);
  constructor() { }

  progress(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  setStatus(isLoading: boolean) {
    this.isLoading$.next(isLoading);
  }
}
