import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ServiceProviderService} from '../service-provider.service';
import {ServiceProviderDataStorageService} from '../../shared/service-provider-data-storage.service';
import {HttpModule} from '@angular/http';
import { ServiceProviderSearchComponent } from './service-provider-search.component';
import {FormsModule} from '@angular/forms';

describe('ServiceProviderSearchComponent', () => {
  let component: ServiceProviderSearchComponent;
  let fixture: ComponentFixture<ServiceProviderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderSearchComponent ],
      providers: [ServiceProviderService, ServiceProviderDataStorageService],
      imports: [HttpModule, FormsModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ServiceProviderSearch component', () => {
    expect(component).toBeTruthy();
  });
});
