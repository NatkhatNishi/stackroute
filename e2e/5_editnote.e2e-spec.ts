import { browser, logging, element, by } from 'protractor';
import { EditViewPage } from './page-objects/editview.po';
fdescribe('Edit View Page', () => {
    let page: EditViewPage;
  
    beforeEach(() => {
      page = new EditViewPage();
    });


    beforeEach(() => {
        page = new EditViewPage();
      });



      it('should allow users to login and edit a note successfully',()=>{
        /* let inputElements = element.all(by.css('input'));
    
        inputElements.get(0).sendKeys('admin');
        inputElements.get(1).sendKeys('password');
    
        let button = element(by.css('button'))
    
        button.click();
    
        expect(browser.getCurrentUrl()).toContain('dashboard/noteview') */
    
        let editNoteElement = element.all(by.css('mat-card'));
        editNoteElement.get(0).click();
        element(by.css('input')).sendKeys('Dummy Note edit');
        element(by.css('textarea')).sendKeys('Dummy Note Text edit testing');
        browser.sleep(4000);
      })

});