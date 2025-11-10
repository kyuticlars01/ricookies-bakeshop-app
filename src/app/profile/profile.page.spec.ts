import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDataService } from '../cart/user.service';
import { of } from 'rxjs';

// Mock the UserDataService
class MockUserDataService {
  user$ = of({ 
    username: 'Test User', 
    email: 'test@example.com', 
    avatarUrl: 'test.jpg' 
  });
  getUser = () => this.user$;
  updateUser = jasmine.createSpy('updateUser');
}

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProfilePage, RouterTestingModule],
      providers: [
        { provide: UserDataService, useClass: MockUserDataService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the profile page', () => {
    expect(component).toBeTruthy();
  });

  it('should display user data from the service', (done) => {
    component.user$.subscribe(user => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      
      expect(compiled.querySelector('.profile-name')?.textContent).toContain('Test User');
      expect(compiled.querySelector('.profile-email')?.textContent).toContain('test@example.com');
      
      done();
    });
  });

  it('should link to sub-pages', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('ion-item');
    
    expect(items[0].getAttribute('routerLink')).toBe('/edit-profile');
    expect(items[1].getAttribute('routerLink')).toBe('/order-history');
    expect(items[2].getAttribute('routerLink')).toBe('/settings');
  });
});
