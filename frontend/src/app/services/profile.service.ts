import { Injectable, signal } from '@angular/core';
import Profile from '../data/models/profile.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UpdateProfileRequest } from '../data/requests/update-profile-request.model';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';

@Injectable({
  providedIn: 'root',
})
export default class ProfileService {
  private _profile = signal<Profile | null>(null);
  profile$ = this._profile.asReadonly();

  private _error = signal<string | null>(null);
  error$ = this._error.asReadonly();

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
  ) {}

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

  updateProfile(request: UpdateProfileRequest): Observable<any> {
    return this.httpClient.put<any>('/api/profile', request).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Erfolg',
          detail: 'Profil wurde erfolgreich aktualisiert.',
          life: 3000,
        });
      }),
      catchError((err) => {
        console.error(err);
        this._error.set('Failed to update profile');
        this.messageService.add({
          severity: 'error',
          summary: 'Fehler',
          detail: 'Profil konnte nicht aktualisiert werden.',
          life: 3000,
        });
        return of(null);
      }),
    );
  }
}
