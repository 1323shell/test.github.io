import {Http, RequestOptions, Response, Headers } from '@angular/http';
import {ServiceProvider} from '../service-provider/service-provider.model';
import {Injectable} from '@angular/core';
import {ServiceProviderService} from '../service-provider/service-provider.service';

@Injectable()
export class ServiceProviderDataStorageService {
  constructor(private http: Http, private serviceProviderService: ServiceProviderService) {  }

  getServiceProviders() {
    this.http.get('http://localhost:4200/assets/class-categories.json')
      .subscribe(
        (response: Response) => {
          const serviceProviders: ServiceProvider[] = response.json();
          this.serviceProviderService.setServiceProviders(serviceProviders);
        }
      );
  }

  getServiceProvidersByFilters() {
    this.http.get('http://localhost:4200/assets/data-storage.json')
      .subscribe(
        (response: Response) => {
          const serviceProviders: ServiceProvider[] = response.json();
          this.serviceProviderService.setServiceProviders(serviceProviders);
        }
      );
  }

  addServiceProvider(serviceProvider) {
    this.http.post('http://localhost:4200/assets/class-categories.json', serviceProvider).subscribe();
  }

  addDomainCategory(serviceCategory) {
    /*const headersServiceCategory = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');*/
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    const options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:8080/SFP/domainCategories', serviceCategory, options)
      .subscribe(data => {
        console.log(data);
      }, error => console.log(error));
  }

  addClassCategory(id, serviceCategory) {
    /*const headersServiceCategory = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');*/
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    const options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:8080/SFP/domainCategories/' + id + '/classCategories', serviceCategory,
      options).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
  }

  getDomainCategories() {
    this.http.get('http://localhost:8080/SFP/domainCategories')
      .subscribe(
        (response: Response) => {
          const domainCategories = response.json();
          this.serviceProviderService.setDomainCategories(domainCategories);
        }
      );
  }

  getClassCategories(id) {
    this.http.get('http://localhost:8080/SFP/domainCategories/' + id + '/classCategories')
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
      this.http.get('http://localhost:8080/SFP/domainCategories/' + i + '/classCategories')
        .subscribe(
          (response: Response) => {
            const classCategoriesAll = response.json();
            this.serviceProviderService.setClassCategoriesAll(classCategoriesAll);
          }
        );
    }
  }
}
