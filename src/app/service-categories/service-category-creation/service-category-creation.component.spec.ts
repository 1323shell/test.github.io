import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceProviderService } from '../../service-provider/service-provider.service';
import { ServiceProviderDataStorageService } from '../../shared/service-provider-data-storage.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ServiceCategoryCreationComponent } from './service-category-creation.component';

describe('ServiceCategoryCreationComponent', () => {
  let component: ServiceCategoryCreationComponent;
  let fixture: ComponentFixture<ServiceCategoryCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCategoryCreationComponent ],
      providers: [ServiceProviderService, ServiceProviderDataStorageService],
      imports: [HttpModule, FormsModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCategoryCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ServiceCategoryCreation Component', () => {
    expect(component).toBeTruthy();
  });
});
