// src/app/cart/cart.page.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CartPage } from './cart.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController } from '@ionic/angular/standalone';
import { CartService } from './cart.service';
import { of } from 'rxjs';

// Mock the CartService
class MockCartService {
  cart$ = of([]);
  total$ = of(0);
  getCart = () => this.cart$;
  getTotal = () => this.total$;
  increaseQuantity = jasmine.createSpy('increaseQuantity');
  decreaseQuantity = jasmine.createSpy('decreaseQuantity');
  removeItem = jasmine.createSpy('removeItem');
  updateQuantity = jasmine.createSpy('updateQuantity');
  clearCart = jasmine.createSpy('clearCart');
}

// Mock the AlertController
class MockAlertController {
  create = jasmine.createSpy('create').and.returnValue(
    Promise.resolve({
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve({ role: 'cancel' }),
    })
  );
}


describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;
  let cartService: MockCartService;
  let alertController: MockAlertController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CartPage, RouterTestingModule],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: AlertController, useClass: MockAlertController },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as unknown as MockCartService;
    alertController = TestBed.inject(AlertController) as unknown as MockAlertController;
    fixture.detectChanges();
  });

  it('should create the cart page', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeItem when removeFromCart is called', () => {
    // FIX: Changed ID from number (1) to string ('1')
    component.removeFromCart('1');
    expect(cartService.removeItem).toHaveBeenCalledWith('1');
  });
  
  it('should call updateQuantity with quantity + 1 when increaseQuantity is called', () => {
    // FIX: Changed ID from number (1) to string ('1')
    component.increaseQuantity('1', 2);
    expect(cartService.updateQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('should call updateQuantity with quantity - 1 when decreaseQuantity is called for quantity > 1', () => {
    // FIX: Changed ID from number (1) to string ('1')
    component.decreaseQuantity('1', 5);
    expect(cartService.updateQuantity).toHaveBeenCalledWith('1', 4);
  });

  it('should call removeItem when decreaseQuantity is called for quantity 1', () => {
    // FIX: Changed ID from number (1) to string ('1')
    component.decreaseQuantity('1', 1);
    expect(cartService.removeItem).toHaveBeenCalledWith('1');
  });

  it('should display the checkout alert when proceedToCheckout is called', async () => {
    await component.proceedToCheckout();
    expect(alertController.create).toHaveBeenCalled();
  });
});