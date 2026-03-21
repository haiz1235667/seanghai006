import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly products = signal<any[]>([]);
  readonly loading = signal<boolean>(false);
  readonly loadError = signal<string | null>(null);

  constructor(private http: HttpClient) {
    void this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);

    try {
      const apiProducts = await firstValueFrom(
        this.http.get<any[]>('https://fakestoreapi.com/products'),
      );

      this.products.set(
        (apiProducts ?? []).map((product: any) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
        })),
      );
    } catch (error: any) {
      console.log(error);
      this.loadError.set('Failed to load products. Please check your internet connection.');
      this.products.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  getProducts(): any[] {
    return this.products();
  }
}
   
