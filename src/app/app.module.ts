import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ViewComponent } from './view/view.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './user/users/users.component';
import { ServiceProviderDataViewingComponent } from './service-provider/service-provider-data-viewing/service-provider-data-viewing.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { ServiceProviderService } from './service-provider/service-provider.service';
import { ServiceProviderDataStorageService } from './shared/service-provider-data-storage.service';
import { HttpModule } from '@angular/http';
import {ServiceProviderCreationComponent} from './service-provider/service-provider-creation/service-provider-creation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceCategoriesComponent } from './service-categories/service-categories.component';
import { ServiceCategoryCreationComponent } from './service-categories/service-category-creation/service-category-creation.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent, children: [
    { path: ':id/:name', component: UsersComponent },
  ] },
  { path: 'view', component: ViewComponent },
  { path: 'search', component: SearchComponent },
  { path: 'service-providers', component: ServiceProviderComponent, children: [
    { path: 'creation', component: ServiceProviderCreationComponent },
    { path: ':id', component: ServiceProviderDataViewingComponent}
  ]},
  { path: 'service-categories', component: ServiceCategoriesComponent, children: [
    { path: 'creation', component: ServiceCategoryCreationComponent }
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ViewComponent,
    SearchComponent,
    HomeComponent,
    UsersComponent,
    ServiceProviderDataViewingComponent,
    ServiceProviderComponent,
    ServiceProviderCreationComponent,
    ServiceCategoriesComponent,
    ServiceCategoryCreationComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularMultiSelectModule
  ],
  providers: [ServiceProviderService, ServiceProviderDataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
