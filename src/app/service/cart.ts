import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  
  items: any = [];        
  receivedAmount = 0;


  addToCart(product: any) {
    //duplicate product check
    let dpl_index: number = this.items.findIndex(
      (item: any) => (parseInt(item.id)) === parseInt(product.id)
    );
    if (dpl_index == -1) {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1
      });
    } else {
      this.items[dpl_index].qty ++;
    }
  }

  getItems(): any {
    return this.items;
  }

  clearCart(): any {
    this.items = [];
    this.receivedAmount = 0;
    return this.items;
  }

  getTotal(): any {
    return this.items.reduce((total: any, item: any) => total + item.price * item.qty, 0);
  }

  setReceivedAmount(amount: number | string | null | undefined): void {
    const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount ?? '0');
    this.receivedAmount = Number.isFinite(numericAmount) ? numericAmount : 0;
  }

  getChangeAmount(): number {
    const total = Number(this.getTotal()) || 0;
    const change = this.receivedAmount - total;
    return change > 0 ? change : 0;
  }
}
