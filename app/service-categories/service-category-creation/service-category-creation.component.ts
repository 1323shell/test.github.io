import {Component, OnInit } from '@angular/core';
import { ServiceProviderDataStorageService } from '../../shared/service-provider-data-storage.service';
import { ServiceProviderService } from '../../service-provider/service-provider.service';
import styleSelect from 'styleselect';

@Component({
  selector: 'app-service-category-creation',
  templateUrl: './service-category-creation.component.html',
  styleUrls: ['./service-category-creation.component.css']
})

export class ServiceCategoryCreationComponent implements OnInit {
  domainCategories = [];
  classCategories = [];
  sphereError = false;
  typeError = false;
  newSphere = false;
  formDataWasSaved = false;
  sphereValuePrevous = '';
  typeCategory;
  sphereCreate;
  typeCategoryCreate;
  errorSubmit = false;

  classCategoriesAll = [];

  constructor(
    private serviceProviderDS: ServiceProviderDataStorageService,
    private serviceProviderService: ServiceProviderService
  ) { }

  ngOnInit() {
    /*обнуляем classCategoriesAll*/
    this.serviceProviderService.classCategoriesAllEmpty();

    /*Array of domainCategories*/
    this.serviceProviderDS.getDomainCategories();
    this.serviceProviderService.domainCategoriesChanged.subscribe(
      (domainCategories) => {
        this.domainCategories = domainCategories;
      }
    );

    setTimeout(() => {
      styleSelect('select');

      /*select all Class Categories*/
      this.serviceProviderDS.getClassCategoriesAll(this.domainCategories);
      this.serviceProviderService.classCategoriesChangedAll.subscribe(
        (classCategoriesAll) => {
          this.classCategoriesAll = classCategoriesAll;
        }
      );
      setTimeout(() => console.log(this.classCategoriesAll), 500);
    }, 100);
  }

  onServiceSphereSelect(form, e) {
    this.serviceProviderDS.getClassCategories(form.controls.sphere.value);
    this.serviceProviderService.classCategoriesChanged.subscribe(
      (classCategories) => {
        this.classCategories = classCategories;
      }
    );

    if (e.target.value !== this.sphereValuePrevous) {
      this.typeCategory = '';
    }
    this.sphereValuePrevous = e.target.value;
    form.controls.type.enable();
  }

  onClick(e) {
    e.preventDefault();
    this.typeError = this.sphereError = false;
    this.newSphere = !this.newSphere;
    this.typeCategory = this.typeCategoryCreate = this.sphereCreate = '';

    if (!this.newSphere) {
      setTimeout(() => styleSelect('select'), 4);  /*из-за него возникала ошибка при переходе по ссылке "Создать категорию сферы услуг"*/
    }
  }

  uniqueDomainCategory() {
    for (let i = 0; i < this.domainCategories.length; i++) {
      if (this.domainCategories[i]['name'] === this.sphereCreate) {
        return true;
      }
    }
  }

  uniqueClassCategory(ClassCategory) {
    for (let i = 0; i < this.classCategoriesAll.length; i++) {
      if (this.classCategoriesAll[i]['name'] === ClassCategory) {
        return true;
      }
    }
  }

  onSubmit(form, e) {
    /*delete error messages*/
    this.sphereError = false;
    this.typeError = false;
    document.querySelector('[name="type"]').classList.remove('error');

    /*error check and display error messages*/
    if (this.newSphere) {
      document.querySelector('[name="sphereCreate"]').classList.remove('error');

      if (form.controls.sphereCreate.invalid || this.uniqueDomainCategory()) {
        document.querySelector('[name="sphereCreate"]').classList.add('error');
        this.sphereError = true;
      }
      if (form.controls.type.invalid || this.uniqueClassCategory(this.typeCategoryCreate)) {
        document.querySelector('[name="type"]').classList.add('error');
        this.typeError = true;
      }
      if (form.controls.sphereCreate.invalid || form.controls.type.invalid || this.uniqueDomainCategory()
        || this.uniqueClassCategory(this.typeCategoryCreate)) {
        this.errorSubmit = true;
        return;
      }
    } else {
      if (form.controls.type.invalid || this.uniqueClassCategory(this.typeCategory)) {
        document.querySelector('[name="type"]').classList.add('error');
        this.typeError = true;
        this.errorSubmit = true;
        return;
      }
    }

    /*post data to server*/
    let serviceCategory = null;
    let domainCategoryId = null;

    if (this.newSphere) {
      serviceCategory = {
        'name': form.controls.sphereCreate.value,
        'categories': {
          'name': form.controls.type.value
        }
      };
      form.controls.sphereCreate.disable();
      this.serviceProviderDS.addDomainCategory(serviceCategory);  /*отправка данных на сервер*/

    } else {
      serviceCategory = {
        'name': form.controls.type.value,
      };
      domainCategoryId =  form.controls.sphere.value;
      e.target.querySelector('.ss-selected-option').classList.add('disabled');

      this.serviceProviderDS.addClassCategory(domainCategoryId, serviceCategory); /*отправка данных на сервер*/
    }
    console.log(serviceCategory);

    /*input disabling*/
    form.controls.type.disable();
    this.formDataWasSaved = true;
  }

  fromBackToSave(form, e) {
    /*обновляем выпадающий список КСУ*/
    this.serviceProviderDS.getDomainCategories();  /*записывает данные в переменную domainCategoriesChanged*/
    /*подписываемся на измененние данных в domainCategoriesChanged. Они запишутся в domainCategories*/
    this.serviceProviderService.domainCategoriesChanged.subscribe(
      (domainCategories) => {
        this.domainCategories = domainCategories;
      }
    );

    /*обновляем список КВУ*/
    this.classCategoriesAll = this.classCategoriesAll.concat([{'name': form.controls.type.value}]);

    /*delete error messages*/
    if (!this.newSphere) {
      this.typeCategory = '';
      document.querySelector('.ss-selected-option').classList.remove('disabled');
      document.querySelector('.ss-selected-option').textContent = 'Выбрать категорию сферы услуг';
      document.querySelector('.ss-option.highlighted').classList.remove('ticked');
      document.querySelector('.ss-option.highlighted').classList.remove('highlighted');
    } else {

      form.controls.sphereCreate.enable();
      this.typeCategoryCreate = this.sphereCreate = '';
    }

    this.formDataWasSaved = false;
  }
}
