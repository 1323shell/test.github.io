import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderComponent } from './service-provider.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ServiceProviderComponent', () => {
  let component: ServiceProviderComponent;
  let fixture: ComponentFixture<ServiceProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderComponent ],
      imports: [RouterTestingModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ServiceProvider component', () => {
    expect(component).toBeTruthy();
  });
});
