import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderDataViewingComponent } from './service-provider-data-viewing.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ServiceProviderService} from '../service-provider.service';
import {ServiceProviderDataStorageService} from '../../shared/service-provider-data-storage.service';
import {HttpModule} from '@angular/http';

describe('ServiceProviderDataViewingComponent', () => {
  let component: ServiceProviderDataViewingComponent;
  let fixture: ComponentFixture<ServiceProviderDataViewingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderDataViewingComponent ],
      providers: [ServiceProviderService, ServiceProviderDataStorageService],
      imports: [RouterTestingModule, HttpModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderDataViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ServiceProviderDataViewing component', () => {
    expect(component).toBeTruthy();
  });
});
