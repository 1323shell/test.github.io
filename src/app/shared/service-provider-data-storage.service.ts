import {Http, RequestOptions, Response, Headers } from '@angular/http';
import {ServiceProvider} from '../service-provider/service-provider.model';
import {Injectable} from '@angular/core';
import {ServiceProviderService} from '../service-provider/service-provider.service';
import {environment} from '../../environments/environment';

@Injectable()
export class ServiceProviderDataStorageService {
  apiUrl = environment.apiUrl;
  constructor(private http: Http, private serviceProviderService: ServiceProviderService) {  }

  getServiceProviders() {
    const url = `${this.apiUrl}/service_providers`;
    this.http.get(url)
      .subscribe(
        (response: Response) => {
          const serviceProviders: ServiceProvider[] = response.json();
          this.serviceProviderService.setServiceProviders(serviceProviders);
        }
      );
  }

  getServiceProvidersByFilters() {
    const url = `${this.apiUrl}/service_providers`;
    this.http.get(url)
      .subscribe(
        (response: Response) => {
          const serviceProviders: ServiceProvider[] = response.json();
          this.serviceProviderService.setServiceProviders(serviceProviders);
        }
      );
  }

  addServiceProvider(serviceProvider) {
    const url = `${this.apiUrl}/service_providers`;
    this.http.post(url, serviceProvider).subscribe();
  }

  addServiceCategory(serviceCategory) {
    const url = `${this.apiUrl}/domainCategories`;
    this.http.post(url, serviceCategory).subscribe();
  }

  addDomainCategory(serviceCategory) {
    const url = `${this.apiUrl}/domainCategories`;
    /*const headersServiceCategory = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');*/
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, serviceCategory, options)
      .subscribe(data => {
        console.log(data);
      }, error => console.log(error));
  }

  addClassCategory(id, serviceCategory) {
    const url = `${this.apiUrl}/domainCategories/${id}/classCategories`;
    /*const headersServiceCategory = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');*/
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, serviceCategory, options)
      .subscribe(data => {
        console.log(data);
      }, error => console.log(error));
  }

  getDomainCategories() {
    const url = `${this.apiUrl}/domainCategories`;
    this.http.get(url)
      .subscribe(
        (response: Response) => {
          const domainCategories = response.json();
          this.serviceProviderService.setDomainCategories(domainCategories);
        }
      );
  }

  getClassCategories(id) {
    const url = `${this.apiUrl}/domainCategories/${id}/classCategories`;
    this.http.get(url)
      .subscribe(
        (response: Response) => {
          const classCategories = response.json();
          this.serviceProviderService.setClassCategories(classCategories);
        }
      );
  }

  /*возможно этот метод сильно нагрузит программу при большом количестве КВУ*/
  getClassCategoriesAll(domainCategories) {
    for (let i = 1; i <= domainCategories.length; i++) {
      this.http.get(`${this.apiUrl}/domainCategories/${i}/classCategories`)
        .subscribe(
          (response: Response) => {
            const classCategoriesAll = response.json();
            this.serviceProviderService.setClassCategoriesAll(classCategoriesAll);
          }
        );
    }
  }
}
