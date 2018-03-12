import { AppPage } from './app.po';

describe('sfp-fe App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to SFP!');
  });

  it('should click the User link and display the User page', () => {
    page.navigateTo();
    page.getUserLink().click();
    expect(page.getParagraphText()).toEqual('The User Component.');
  });

  it('should click the View link and display the View page', () => {
    page.navigateTo();
    page.getViewLink().click();
    expect(page.getParagraphText()).toEqual('The View Component.');
  });

  it('should click the View link and display the Search page', () => {
    page.navigateTo();
    page.getSearchLink().click();
    expect(page.getParagraphText()).toEqual('Search');
  });

  it('should click the Service Provider link and display the Service Provider page', () => {
    page.navigateTo();
    page.getServiceProviderLink().click();
    expect(page.getParagraphText()).toEqual('Service provider page');
  });

  it('should click the Service Categories link and display the Service Categories page', () => {
    page.navigateTo();
    page.getServiceCategoriesLink().click();
    expect(page.getParagraphText()).toEqual('Service categories page');
  });
});
