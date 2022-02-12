import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

/**
 * sub page containing specific selectors and methods for a Job page
 */
class JobPage extends Page {
    /**
     * define selectors using getter methods
     */
     get applyButton(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {return $('button')}
     get dialogName(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {return $('input[name="name"]')}
     get dialogEmail(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {return $('input[name="email"]')}
     get dialogFile(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {return $('input[type="file"]')}
     get submitButton(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {return $('button[type="submit"]')}
     get errorMessages(): ChainablePromiseElement<Promise<WebdriverIO.ElementArray>> {return $$('div.error-msz')}
     get successMessage(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {return $('div.success')}

    
     public open(path: string): Promise<void>{
        return super.open(path);
    }

    
   

    async applyJob(name: string, email: string, file?: string): Promise<void>{
        await this.dialogName.setValue(name);
        await this.dialogEmail.setValue(email);
        if(file){
        const path = require('path');
        const filePath = path.join(__dirname, '../test_data/CV1.pdf');
        await this.dialogFile.setValue(filePath);}
        await this.submitButton.click();
    }
}

export default new JobPage();
