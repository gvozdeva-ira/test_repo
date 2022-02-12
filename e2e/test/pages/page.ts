/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
     get pageHeader(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {return $('h1')}

     public open(path: string): Promise<void>{
        browser.url(path);
      }
}
