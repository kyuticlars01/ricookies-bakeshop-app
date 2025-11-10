import { TestBed } from '@angular/core/testing';
import { MenuPage } from './menu.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@ionic/angular/standalone';
import { CartService } from '../cart/cart.service';
import { of } from 'rxjs';

// Mock CartService (minimal implementation for testing)
class MockCartService {
  cart$ = of([]);
  total$ = of(0);
  addToCart = jasmine.createSpy('addToCart');
}

// Mock ModalController
class MockModalController {
  create = jasmine.createSpy('create').and.returnValue(
    Promise.resolve({
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve({ data: { quantity: 1 }, role: 'confirm' }),
    })
  );
}

describe('MenuPage', () => {
  let component: MenuPage;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPage, RouterTestingModule],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: ModalController, useClass: MockModalController },
      ],
    }).compileComponents();
    
    const fixture = TestBed.createComponent(MenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the menu page', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of menu items', () => {
    expect(component.menuItems.length).toBeGreaterThan(0);
  });
  
  it('should open the product modal when a card is clicked', async () => {
    const modalController = TestBed.inject(ModalController);
    const item = component.menuItems[0];
    
    await component.openProductModal(item);
    
    expect(modalController.create).toHaveBeenCalled();
  });

  it('should add item to cart when modal confirms', async () => {
    const cartService = TestBed.inject(CartService) as unknown as MockCartService;
    const item = component.menuItems[0];
    
    // Spy on the toast method to prevent real pop-up during test
    spyOn(component, 'showToast'); 
    
    await component.openProductModal(item);
    
    // Check if addToCart was called with the correct item and quantity (1)
    expect(cartService.addToCart).toHaveBeenCalledWith(item, 1);
  });
});