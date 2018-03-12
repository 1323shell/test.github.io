import {ServiceProvider} from './service-provider.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ServiceProviderService {
  serviceProvidersChanged = new Subject<ServiceProvider[]>();
  serviceProviders: ServiceProvider[] = [];
  domainCategoriesChanged = new Subject<any>();
  domainCategories;
  classCategoriesChanged = new Subject<any>();
  classCategories;
  classCategoriesChangedAll = new Subject<any>();
  classCategoriesAll = [];

  constructor() {}

  getServiceProviders() {
    return this.serviceProviders.slice();
  }

  getServiceProvider(index: number) {
    return this.serviceProviders[index];
  }

  setServiceProviders(serviceProviders: ServiceProvider[]) {
    this.serviceProviders = serviceProviders;
    this.serviceProvidersChanged.next(this.serviceProviders.slice());
  }

  setDomainCategories(domainCategories) {
    this.domainCategories = domainCategories;
    this.domainCategoriesChanged.next(this.domainCategories);
  }

  setClassCategories(classCategories) {
    this.classCategories = classCategories;
    this.classCategoriesChanged.next(this.classCategories);
  }

  setClassCategoriesAll(classCategoriesAll) {
    this.classCategoriesAll = this.classCategoriesAll.concat(classCategoriesAll);
    this.classCategoriesChangedAll.next(this.classCategoriesAll);
  }

  classCategoriesAllEmpty() {
    this.classCategoriesAll = [];
  }
}
