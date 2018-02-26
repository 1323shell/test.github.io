import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCategoriesComponent } from './service-categories.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ServiceCategoriesComponent', () => {
  let component: ServiceCategoriesComponent;
  let fixture: ComponentFixture<ServiceCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCategoriesComponent ],
      imports: [RouterTestingModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ServiceCategories component', () => {
    expect(component).toBeTruthy();
  });
});
