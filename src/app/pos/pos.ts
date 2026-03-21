import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductService } from '../service/product-service';
import { Cart } from '../service/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToKHRPipe } from '../pipes/to-khr-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pos',
  imports: [
    CommonModule,
    FormsModule,
    ToKHRPipe,
  ],
  templateUrl: './pos.html',
  styleUrl: './pos.css',
  standalone: true
})
export class Pos {
  constructor(
    public productService: ProductService,
    public cartService: Cart,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) 
  {

  }
    received_amount: number = 0;

  private clearCartAndReset(): void {
    this.cartService.clearCart();
    this.received_amount = 0;
    this.cdr.detectChanges();
  }

  private getSwalFire(): ((options: any) => Promise<any>) | undefined {
    const swal = (globalThis as any).Swal;
    const fire = swal?.fire;
    if (typeof fire !== 'function') return undefined;
    return (options: any) => fire.call(swal, options);
  }

  private showMessage(type: 'success' | 'warning' | 'info', title: string, text?: string): void {
    const fire = this.getSwalFire();
    if (fire) {
      void fire({ icon: type, title, text });
      return;
    }

    alert(text ? `${title}\n\n${text}` : title);
  }

  onProductClick(product: any) {
    product.qty = 1; 
    this.cartService.addToCart(product);   
      }

      checkout() {
        const total = Number(this.cartService.getTotal()) || 0;
        if (this.received_amount >= total) {
         this.cartService.setReceivedAmount(this.received_amount);
         this.router.navigate(['/invoice']);
//           Swal.fire({
//             title: "Payment successful!",
//             icon: "success",
//             draggable: false
// });
           this.received_amount = 0;
        }else {
          this.showMessage('warning', 'Payment Failed...', 'Insufficient amount received!');
    
        }
       
      }
      cancel(): void {
        const itemCount = this.cartService.getItems()?.length ?? 0;
        const receivedAmount = Number(this.received_amount) || 0;

        if (itemCount <= 0 && receivedAmount <= 0) {
          this.showMessage('info', 'Cart is empty.');
          return;
        }

        const fire = this.getSwalFire();
        if (!fire) {
          if (!confirm('Clear the cart?')) return;
          this.clearCartAndReset();
          this.showMessage('success', 'Cleared!', 'Cart has been cleared.');
          return;
        }

        void fire({
          title: 'Are you sure?',
          text: 'This cart will be cleared!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, clear it!',
          cancelButtonText: 'No',
        }).then((result: any) => {
          if (!result?.isConfirmed) return;
          this.clearCartAndReset();
          this.showMessage('success', 'Cleared!', 'Cart has been cleared.');
        });
      }


} 
