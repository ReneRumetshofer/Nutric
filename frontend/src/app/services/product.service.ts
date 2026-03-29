import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CreateProductRequest } from '../data/requests/create-product-request.model';
import { Product } from '../data/models/product.model';

@Injectable({
  providedIn: 'root',
})
export default class ProductService {
  private _loading = signal<boolean>(false);
  loading$ = this._loading.asReadonly();

  private _error = signal<string | null>(null);
  error$ = this._error.asReadonly();

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
  ) {}

  createProduct(request: CreateProductRequest): Observable<Product | null> {
    this._loading.set(true);
    this._error.set(null);

    return this.httpClient.post<Product>('/api/products', request).pipe(
      tap(() => {
        this._loading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Erfolg',
          detail: 'Produkt wurde erfolgreich erstellt.',
          life: 3000,
        });
      }),
      catchError((err) => {
        console.error(err);
        this._loading.set(false);
        this._error.set('Failed to create product');
        this.messageService.add({
          severity: 'error',
          summary: 'Fehler',
          detail: 'Produkt konnte nicht erstellt werden.',
          life: 3000,
        });
        return of(null);
      }),
    );
  }
}
