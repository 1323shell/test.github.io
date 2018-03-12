import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h3')).getText();
  }

  getUserLink() {
    return element(by.cssContainingText('a', 'User'));
  }

  getViewLink() {
    return element(by.cssContainingText('a', 'View'));
  }

  getSearchLink() {
    return element(by.cssContainingText('a', 'Search'));
  }

  getServiceProviderLink() {
    return element(by.cssContainingText('a', 'Service Provider'));
  }
  getServiceCategoriesLink() {
    return element(by.cssContainingText('a', 'Service Categories'));
  }
}
