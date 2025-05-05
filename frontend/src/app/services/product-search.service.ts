import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { SearchResult } from '../data/models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export default class ProductSearchService {
  private _searchResults = signal<SearchResult[] | null>(null);
  searchResults$ = this._searchResults.asReadonly();

  private _error = signal<string | null>(null);
  error$ = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  loading$ = this._loading.asReadonly();

  constructor(private httpClient: HttpClient) {}

  searchProducts(query: string) {
    this._loading.set(true);
    this._error.set(null);

    this.httpClient
      .get<SearchResult[]>('/api/foods/search', { params: { query: query } })
      .pipe(
        catchError((err) => {
          console.error(err);
          this._loading.set(false);
          this._error.set('Failed to load search results!');
          return of(null);
        }),
      )
      .subscribe((searchResults) => {
        this._loading.set(false);
        this._searchResults.set(searchResults);
      });
  }

  reset(): void {
    this._loading.set(false);
    this._error.set(null);
    this._searchResults.set(null);
  }
}
