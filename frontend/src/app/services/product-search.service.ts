import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Product, ServingUnit, Unit } from '../data/models/product.model';

@Injectable({
  providedIn: 'root',
})
export default class ProductSearchService {
  private _products = signal<Product[] | null>(null);
  products$ = this._products.asReadonly();

  private _error = signal<string | null>(null);
  error$ = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  loading$ = this._loading.asReadonly();

  constructor(private httpClient: HttpClient) {}

  searchProducts(query: string) {
    this._loading.set(true);
    this._error.set(null);

    this.httpClient
      .get<Product[]>('/api/foods/search', { params: { query: query } })
      .pipe(
        catchError((err) => {
          console.error(err);
          this._loading.set(false);
          this._error.set('Failed to load products!');
          return of(null);
        }),
      )
      .subscribe((products) => {
        this._loading.set(false);
        this._products.set(products);
      });
  }

  reset(): void {
    this._loading.set(false);
    this._error.set(null);
    this._products.set(null);
  }
}
