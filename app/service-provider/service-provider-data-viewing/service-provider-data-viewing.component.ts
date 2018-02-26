import {Component, OnInit} from '@angular/core';
import {ServiceProviderService} from '../service-provider.service';
import {ServiceProvider} from '../service-provider.model';
import {ActivatedRoute, Params} from '@angular/router';
import {ServiceProviderDataStorageService} from '../../shared/service-provider-data-storage.service';

@Component({
  selector: 'app-service-provider-data-viewing',
  templateUrl: './service-provider-data-viewing.component.html',
  styleUrls: ['./service-provider-data-viewing.component.css']
})
export class ServiceProviderDataViewingComponent implements OnInit {
  serviceProvider: ServiceProvider;
  serviceProviders: Array<ServiceProvider>;
  serviceSpheres = [];
  id: number;
  constructor(
    private serviceProviderService: ServiceProviderService,
    private route: ActivatedRoute,
    private serviceProviderDS: ServiceProviderDataStorageService) { }

  ngOnInit() {
    this.serviceProviderDS.getServiceProviders();
    this.serviceProviderService.serviceProvidersChanged.subscribe(
      (serviceProviders: ServiceProvider[]) => {
        this.serviceProviders = serviceProviders;
        this.route.params.subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.serviceProvider = this.serviceProviderService.getServiceProvider(this.id);
            for (let i = 0; i < this.serviceProvider.classCategories.length; i++) {
              if (this.serviceSpheres.length) {
                for ( let k = 0; k < this.serviceSpheres.length; k++) {
                  if (this.serviceSpheres[k]['name'] === this.serviceProvider.classCategories[i]['domainCategory']['name']) {
                    if (this.serviceSpheres[k]['types'].indexOf(this.serviceProvider.classCategories[i]['name']) === -1) {
                      this.serviceSpheres[k]['types'].push(this.serviceProvider.classCategories[i]['name']);
                    }
                  } else {
                    this.serviceSpheres.push(
                      {
                        name: this.serviceProvider.classCategories[i]['domainCategory']['name'],
                        types: [this.serviceProvider.classCategories[i]['name']]
                      }
                    );
                  }
                }
              } else {
                this.serviceSpheres.push(
                  {
                    name: this.serviceProvider.classCategories[i]['domainCategory']['name'],
                    types: [this.serviceProvider.classCategories[i]['name']]
                  }
                );
              }
            }
          }
        );
      }
    );
  }

}
