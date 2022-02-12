import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
     get jobListing() {return $$('ul > li')}
     get jobNames() {return $$('span.title')}
     get jobLocations() {return $$('span.location')}
     get jobDate() {return $$('span.date')}


     public open(path: string): Promise<void>{
        return super.open(path);
    }
    async getJobName(indexJob: number): Promise<string>{
        const elements = await this.jobNames;
        return await elements[indexJob].getText();
    }
}

export default new HomePage();
