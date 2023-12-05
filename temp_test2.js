const webdriver = require('selenium-webdriver');
const firefox    = require('selenium-webdriver/firefox');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const screen = {
  width: 640,
  height: 480
};

describe('webdriver', () => {
    let driver;
    before(async () => {
      driver = new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless())
      .build();
      console.log('Loading Webpage');
      await driver.get(`http://localhost:3000`);
    }, 3000);
  
    after(async () => {
        console.log("\nTests Completed!!\n");
        await setTimeout(function() {
            driver.quit();
          }, 3000);
    }, 4000);
  
    it('test App loads', async () => {
      console.log("Testing If App Loads");
      const title = await driver.getTitle()
      console.log(title)
      assert.equal(title, "Node To Do Application");
    }, 2000);

    it('Clear previous tasks', async () => {
      await driver.findElement(By.css("#btnClr")).click();    
      const added_tasksUpdated = await driver.findElements(By.css(".added-tasks"))
      assert.equal(added_tasksUpdated.length, 0);
    }, 5000);

    it('Add New Task', async () => {
      const added_tasks = await driver.findElements(By.css(".added-tasks"))
      const field = await driver.findElement(By.css(".add-task-input"))
      // console.log(field);
      await field.sendKeys("New Task");
      await driver.findElement(By.css(".add-btn")).click();
      const added_tasksUpdated = await driver.findElements(By.css(".added-tasks"))
      assert.equal(added_tasksUpdated.length, added_tasks.length+1);
      
    }, 5000);

    it('Verify Newely Added Task', async () => {
      const added_tasks = await driver.findElements(By.css(".added-tasks-input"))
      assert.equal(await added_tasks[added_tasks.length-1].getText(), "New Task");
    }, 5000);

    it('Remove New Added Tasks', async () => {
      await driver.findElement(By.css(".remove-task")).click();
      const added_tasks = await driver.findElements(By.css(".added-tasks-input"))
      assert.equal(added_tasks.length, 0);
    }, 5000);
  
});
