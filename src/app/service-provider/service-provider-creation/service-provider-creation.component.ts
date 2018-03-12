import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceProviderDataStorageService } from '../../shared/service-provider-data-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceProviderService } from '../service-provider.service';

@Component({
  selector: 'app-service-provider-creation',
  templateUrl: './service-provider-creation.component.html',
  styleUrls: ['./service-provider-creation.component.css']
})
export class ServiceProviderCreationComponent implements OnInit {
  public serviceProvider = {
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
  public address = {
    street: '',
    building: '',
    block: ''
  }
  public categories = [
    {
      classCategories: null,
      dropdownList: [],
      dropdownSettings: {
        singleSelection: false,
        text: 'Выберите категории вида услуг',
        enableSearchFilter: false,
        enableCheckAll: false,
        showCheckbox: true,
        disabled: true,
        classes: 'custom-multy-select'
      },
      previousSphereSelected: null,
      sphereSelected: null,
      classSelected: null
    }
  ];
  public customSelectSettings = {
    placeholder: 'Выберите категорию сферы услуг',
    useTag: true
  };
  public categoriesView: any = [];
  public addCategoriesIsActive = false;
  public formDataWasSaved: boolean = false;
  public domainCategories: any = null;
  public mask = ['+', '3', '7', '5', ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor(private serviceProviderDS: ServiceProviderDataStorageService, private serviceProvider1: ServiceProviderService) { }

  ngOnInit() {
    this.serviceProviderDS.getSphereCategories().subscribe(
      (response) => {
        this.domainCategories = JSON.parse(response.text());
      }
    );
  }

  public onServiceSphereSelect(e, i): void {
    this.changeSphereList(this.categories[i].previousSphereSelected, e);
    this.categories[i].previousSphereSelected = e;
    this.categories[i].classSelected = null;
    this.addCategoriesIsActive = this.lastCategoryIsEmpty();
    this.serviceProviderDS.getTypeCategories(e.id).subscribe(
      (response) => {
        this.categories[i].classCategories = JSON.parse(response.text()).slice();
        this.categories[i].dropdownList = this.categories[i].classCategories.map((item) => {
          return {
            'id': item.id,
            'itemName': item.name.slice(0, 1).toUpperCase() + item.name.slice(1)
          };
        });
        this.categories[i].dropdownSettings = {
          singleSelection: false,
          text: 'Выберите категории вида услуг',
          enableSearchFilter: false,
          enableCheckAll: false,
          showCheckbox: true,
          disabled: false,
          classes: 'custom-multy-select'
        };
      }
    );
  }

  public onDeleteSphere(event, i) {
    this.categories[i].previousSphereSelected = null;
    this.categories[i].classSelected = null;
    this.categories[i].classCategories = null;
    this.categories[i].dropdownList = [];
    this.categories[i].dropdownSettings = {
      singleSelection: false,
      text: 'Выберите категории вида услуг',
      enableSearchFilter: false,
      enableCheckAll: false,
      showCheckbox: true,
      disabled: true,
      classes: 'custom-multy-select'
    };
    this.domainCategories.push(event);
    this.addCategoriesIsActive = this.lastCategoryIsEmpty();
  }

  public onItemSelect(item: any): void {
    this.addCategoriesIsActive = this.lastCategoryIsEmpty();
  }

  public onItemDeSelect(item: any): void {
    this.addCategoriesIsActive = this.lastCategoryIsEmpty();
  }

  private lastCategoryIsEmpty(): boolean {
    if ( !this.categories[this.categories.length - 1].classSelected ) {
      return false;
    } else if (this.categories[this.categories.length - 1].classSelected.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public trackCategory(i, item) {
    return i;
  }

  private changeSphereList( previousValue, currentValue): void {
    let index: number = null;
    this.domainCategories.forEach((item, i) => {
      if (item.id === currentValue.id) {
        index = i;
      }
    });
    if (previousValue) {
      this.domainCategories.push(previousValue);
    }
    this.domainCategories.splice(index, 1);
  }

  public onAddCategory(e): void {
    this.categories = this.categories.slice();
    this.categories.push({
      classCategories: null,
      dropdownList: [],
      dropdownSettings: {
        singleSelection: false,
        text: 'Выберите категории вида услуг',
        enableSearchFilter: false,
        enableCheckAll: false,
        showCheckbox: true,
        disabled: true,
        classes: 'custom-multy-select'
      },
      previousSphereSelected: null,
      sphereSelected: null,
      classSelected: null
    });
    this.addCategoriesIsActive = false;
  }

  public onDeleteCategory(i: number): void {
    this.categories = this.categories.slice();
    if (this.categories[i].sphereSelected) {
      this.domainCategories.push(
        {
          id: this.categories[i].sphereSelected.id,
          name: this.categories[i].sphereSelected.name
        }
      );
    }
    this.categories.splice(i, 1);
    this.addCategoriesIsActive = this.lastCategoryIsEmpty();
  }

  public onChangeBuildinAndBlock(e, f): void {
    if (e.target.value === '') {
      this.address.building = '';
      this.address.block = '';
    }
  }

  public onChangeBlock(e, f): void {
    if (e.target.value === '') {
      this.address.block = '';
    }
  }

  public onSubmit(form: NgForm): void {
    this.categoriesView = this.categories.map(item => {
      return {sphereSelected: item.sphereSelected, classSelected: item.classSelected ? item.classSelected : []};
    });
    this.serviceProvider.name = form.value.name.replace(/^\s/, '').trim();
    this.serviceProvider.city = form.value.city.replace(/^\s/, '').trim();
    this.serviceProvider.street = form.value.address.street.replace(/^\s/, '').trim();
    this.serviceProvider.building = form.value.address.building;
    this.serviceProvider.block = form.value.address.block;
    this.serviceProvider.mobile = this.serviceProvider.mobile ? '+' + form.value.mobile.replace(/\D/g, '') : '';
    this.serviceProvider.phone = this.serviceProvider.phone ? '+' + form.value.phone.replace(/\D/g, '') : '';
    this.serviceProvider.email = form.value.email;
    this.serviceProvider.site = form.value.site;
    this.categories.forEach(category => {
      if (!category.classSelected) return;
      category.classSelected.forEach(item => {
        if (this.serviceProvider.classCategories.indexOf(item.id) === -1) {
          this.serviceProvider.classCategories.push(item.id);
        }
      });
    });
    const serviceProvider = JSON.stringify(this.serviceProvider, (key, value) => {
      if (value) {
        return value;
      } else {
        return null;
      }
    });
    this.serviceProviderDS.addServiceProvider(serviceProvider).subscribe(
      (response) => {
      }, (error: HttpErrorResponse) => {
      }
    );
    this.formDataWasSaved = true;
  }
}
