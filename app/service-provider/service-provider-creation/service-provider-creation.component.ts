import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceProviderService } from '../service-provider.service';
import { ServiceProviderDataStorageService } from '../../shared/service-provider-data-storage.service';
@Component({
  selector: 'app-service-provider-creation',
  templateUrl: './service-provider-creation.component.html',
  styleUrls: ['./service-provider-creation.component.css']
})
export class ServiceProviderCreationComponent implements OnInit {
  serviceProvider = {
    name: '',
    city: '',
    street: '',
    building: '',
    block: '',
    mobile: '',
    phone: '',
    email: '',
    site: '',
    classCategories: []
  };
  formDataWasSaved = false;
  domainCategories = null;
  classCategories = null;
  selectedClassCategories = [];
  serviceSphereError = false;
  serviceTypesError = false;
  nameError = false;
  cityError = false;
  contactsError = false;
  constructor(
    private serviceProviderService: ServiceProviderService,
    private serviceProviderDS: ServiceProviderDataStorageService
  ) { }

  ngOnInit() {
    this.serviceProviderDS.getDomainCategories();
    this.serviceProviderService.domainCategoriesChanged.subscribe(
      (domainCategories) => {
        this.domainCategories = domainCategories;
      }
    );
  }
  onServiceSphereSelect(e) {
    this.serviceProviderDS.getClassCategories();
    this.serviceProviderService.classCategoriesChanged.subscribe(
      (classCategories) => {
        this.classCategories = classCategories;
      }
    );
  }
  onServiceTypeSelect(e) {
    if (this.selectedClassCategories.indexOf(e.target.value) === -1) {
      this.selectedClassCategories.push(e.target.value);
    } else {
      this.selectedClassCategories = this.selectedClassCategories.filter( (item) => {
        return (item !== e.target.value);
      });
    }
  }
  onAddCategory(e) {
    console.log(e);
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.serviceSphereError = false;
    this.serviceTypesError = false;
    this.nameError = false;
    this.cityError = false;
    this.contactsError = false;
    this.serviceProvider.name = form.value.name;
    this.serviceProvider.city = form.value.city;
    this.serviceProvider.street = form.value.address.street;
    this.serviceProvider.building = form.value.address.building;
    this.serviceProvider.block = form.value.address.block;
    this.serviceProvider.mobile = form.value.mobile;
    this.serviceProvider.phone = form.value.phone;
    this.serviceProvider.email = form.value.email;
    this.serviceProvider.site = form.value.site;
    this.serviceProvider.classCategories = this.selectedClassCategories;
    this.serviceProviderDS.addServiceProvider(this.serviceProvider);
    this.formDataWasSaved = true;
  }

}
