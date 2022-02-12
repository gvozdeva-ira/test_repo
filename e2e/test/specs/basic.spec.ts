import HomePage from '../pages/home.page';
import JobPage from '../pages/job.page';


describe('Basic application tests', () => {
    beforeEach(async () => {
        await HomePage.open('/jobs');
        await HomePage.pageHeader.waitForDisplayed();
    });
    it('Should open home paage and check jobs listing, header', async () => {
        expect(await HomePage.pageHeader.getText()).toEqual('BROWSE JOBS');
        expect(await HomePage.jobListing.length).toBeGreaterThan(0);  
        expect(await HomePage.jobListing.length).toEqual(await HomePage.jobNames.length);  
        expect(await HomePage.jobListing.length).toEqual(await HomePage.jobLocations.length);  
    });
   
    it('Should click on each job and check job page is shown, position names are the same', async () => {
        const jobs = await HomePage.jobListing
        //check only 5 jobs, have a problem with loop when job listing is big - if more time i'd check each job
        for (let i = 0; i < 6; i++) {
            const name = await HomePage.getJobName(i);
            await jobs[i].click();
            await JobPage.applyButton.waitForDisplayed();
            expect(await JobPage.applyButton).toBeClickable();
            const jobTitle = await JobPage.pageHeader.getText();
            expect(await jobTitle.toLowerCase()).toEqual(name.toLowerCase());
            browser.back();
            await HomePage.pageHeader.waitForDisplayed();
          }
    });
    it('Should open job page and check elements', async () => {
        const jobs = await HomePage.jobListing;
        await jobs[0].click()
        await JobPage.applyButton.waitForDisplayed();
        await JobPage.applyButton.click();
        await JobPage.applyJob("Test Candidate", 'test@gmail.com', 'file')
        expect(await JobPage.successMessage.getText()).toEqual('Application submitted');
    });
    it('Should open job page and check validations for apply position dialog', async () => {
        const jobs = await HomePage.jobListing;
        await jobs[0].click()
        await JobPage.applyButton.waitForDisplayed();
        await JobPage.applyButton.click();
        await JobPage.applyJob("","")
        expect(await JobPage.errorMessages[0].getText()).toEqual('Name is required.');
        expect(await JobPage.errorMessages[1].getText()).toEqual('Email is required.');
        expect(await JobPage.errorMessages[2].getText()).toEqual('Resume is required.');

    });
    // Bug in the app - user can provide not valid Email address!!! 
    it('Should open job page and check validations for apply position dialog', async () => {
        const jobs = await HomePage.jobListing;
        await jobs[0].click()
        await JobPage.applyButton.waitForDisplayed();
        await JobPage.applyButton.click();
        await JobPage.applyJob("t","rrrr", "file")
        expect(await JobPage.errorMessages[0].getText()).toEqual('Name must be at least 2 characters long.');
        expect(await JobPage.errorMessages[1].getText()).toEqual('Email should be valid.');
    })
});
