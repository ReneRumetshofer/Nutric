import { Injectable, signal } from '@angular/core';
import Profile from '../models/profile.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ProfileService {
  private _profile = signal<Profile | null>(null);
  profile$ = this._profile.asReadonly();

  private _error = signal<string | null>(null);
  error$ = this._error.asReadonly();

  constructor(private httpClient: HttpClient) {}

  fetchProfile() {
    this.httpClient
      .get<Profile>('/api/profile')
      .pipe(
        catchError((err) => {
          console.error(err);
          this._error.set('Failed to load profile');
          return of(null);
        }),
      )
      .subscribe((profile) => {
        this._profile.set(profile);
      });
  }
}
