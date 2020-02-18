import { AppPage } from './page-objects/app.po';
import { browser, logging, element, by } from 'protractor';

describe('home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should check header presentation on home page', () => {
    page.navigateTo();
    expect(page.isHeaderPresent()).toBeTruthy('<mat-toolbar> should exist in header.component.html');
  });

  it('should allow users to login and on success redirects to dashboard with note-view',()=>{
    let inputElements = element.all(by.css('input'));

    inputElements.get(0).sendKeys('admin');
    inputElements.get(1).sendKeys('password');

    let button = element(by.css('button'))

    button.click();

    expect(browser.getCurrentUrl()).toContain('dashboard/noteview')

    browser.sleep(4000);
  })

  it('should display on note-view the correct no. of notes retrieved',()=>{
    let cards = element.all(by.css('mat-card'));
    expect(cards.count()).toBe(8);
  })

  it('should allow users to add note and increment the note count',()=>{
    element(by.css('mat-expansion-panel-header')).click();
    element(by.css('input')).sendKeys('Dummy Note');
    element(by.css('textarea')).sendKeys('Dummy Note Text');

    element(by.css('button')).click();

    let cards = element.all(by.css('mat-card'));
    expect(cards.count()).toBe(9);

  })

});
