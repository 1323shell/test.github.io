import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderCreationComponent } from './service-provider-creation.component';
import {ServiceProviderService} from '../service-provider.service';
import {ServiceProviderDataStorageService} from '../../shared/service-provider-data-storage.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

describe('ServiceProviderCreationComponent', () => {
  let component: ServiceProviderCreationComponent;
  let fixture: ComponentFixture<ServiceProviderCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderCreationComponent ],
      providers: [ServiceProviderService, ServiceProviderDataStorageService],
      imports: [HttpModule, FormsModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ServiceProviderCreation component', () => {
    expect(component).toBeTruthy();
  });
});
