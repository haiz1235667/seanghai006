import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToKHRPipe } from '../pipes/to-khr-pipe';
import { Cart } from '../service/cart';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, ToKHRPipe],
  templateUrl: './invoice.html',
  styleUrl: './invoice.css',
})
export class Invoice implements OnInit, OnDestroy {
  date = new Date();
  billNumber = Date.now();
  gstNumber = '49104871290471';
  website = 'www.kak.in';
  tableNumber = 3;

  private readonly afterPrintListener = () => {
    window.removeEventListener('afterprint', this.afterPrintListener);
    this.cartService.clearCart();
    this.router.navigate(['/pos']);
  };

  constructor(
    private router: Router,
    public cartService: Cart,
  ) {}

  get receivedAmount(): number {
    return Number(this.cartService.receivedAmount) || 0;
  }

  get changeAmount(): number {
    return this.cartService.getChangeAmount();
  }

  ngOnInit(): void {
    if (this.cartService.getItems()?.length <= 0) {
      this.router.navigate(['/pos']);
      return;
    }

    window.addEventListener('afterprint', this.afterPrintListener);
    setTimeout(() => window.print());
  }

  ngOnDestroy(): void {
    window.removeEventListener('afterprint', this.afterPrintListener);
  }
}
