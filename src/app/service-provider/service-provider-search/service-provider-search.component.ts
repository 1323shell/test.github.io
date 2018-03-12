import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from '../service-provider.model';
import { ServiceProviderService } from '../service-provider.service';
import { ServiceProviderDataStorageService } from '../../shared/service-provider-data-storage.service';
import { NgForm } from '@angular/forms';
import styleSelect from 'styleselect';

@Component({
  selector: 'app-service-provider-search',
  templateUrl: './service-provider-search.component.html',
  styleUrls: ['./service-provider-search.component.css']
})
export class ServiceProviderSearchComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    text: 'Выбрать категорию вида услуг',
    enableSearchFilter: false,
    enableCheckAll: false,
    showCheckbox: false,
    classes: 'myclass custom-class'
  };
  serviceProviders;
  domainCategories = null;
  classCategories = null;
  selectedClassCategories = [];
  constructor(private serviceProviderService: ServiceProviderService,
              private serviceProviderDS: ServiceProviderDataStorageService) { }

  ngOnInit() {
    this.serviceProviderDS.getDomainCategories();
    this.serviceProviderService.domainCategoriesChanged.subscribe(
      (domainCategories) => {
        this.domainCategories = domainCategories;
      }
    );
    this.serviceProviderDS.getServiceProviders();
    this.serviceProviderService.serviceProvidersChanged.subscribe(
      (serviceProviders: ServiceProvider[]) => {
        this.serviceProviders = serviceProviders;
      }
    );
    setTimeout(() => styleSelect('select'), 100);
  }
  onServiceSphereSelect(e) {
    //TODO
    this.serviceProviderDS.getClassCategories(this.domainCategories[0].id);
    this.serviceProviderService.classCategoriesChanged.subscribe(
      (classCategories) => {
        this.classCategories = classCategories;
        this.dropdownList = [];
        for (let i = 0; i < this.classCategories.length; i++) {
          this.dropdownList.push({
            'id': this.classCategories[i].id,
            'itemName': this.classCategories[i].name.slice(0, 1).toUpperCase() + this.classCategories[i].name.slice(1)
          });
        }
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
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.serviceProviderDS.getServiceProvidersByFilters();
    this.serviceProviderService.serviceProvidersChanged.subscribe(
      (serviceProviders: ServiceProvider[]) => {
        this.serviceProviders = serviceProviders;
      }
    );
  }
  onReset(form: NgForm) {
    form.reset();
    form.controls.sphere.setValue('');
    form.controls.type.setValue('');
    this.serviceProviderDS.getServiceProviders();
    this.serviceProviderService.serviceProvidersChanged.subscribe(
      (serviceProviders: ServiceProvider[]) => {
        this.serviceProviders = serviceProviders;
      }
    );
  }
  onItemSelect(item: any) {
    if (event.srcElement.nodeName === 'LI') {
      event.srcElement.classList.add('checked');
    } else if (event.srcElement.nodeName === 'LABEL') {
      event.srcElement.parentElement.classList.add('checked');
    }
  }
  OnItemDeSelect(item: any) {
    if (event.srcElement.nodeName === 'LI') {
      event.srcElement.classList.remove('checked');
    } else if (event.srcElement.nodeName === 'LABEL') {
      event.srcElement.parentElement.classList.remove('checked');
    }
  }
}
