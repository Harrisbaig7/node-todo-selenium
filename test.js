const webdriver = require('selenium-webdriver');
const firefox    = require('selenium-webdriver/firefox');
const { By } = require('selenium-webdriver');

const test = async () => {
	const driver = new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless()).build();
	console.log('Loading Webpage');
	await driver.get(`http://localhost:3000`);
    
    console.log("1) Testing If app loads");
        const title = await driver.getTitle()
        console.log(title == "Node To Do Application");
  
    console.log('2) Clear previous tasks')
        await driver.findElement(By.css("#btnClr")).click();    
        let added_tasksUpdated = await driver.findElements(By.css(".added-tasks"))
        console.log(added_tasksUpdated.length == 0);
      
    console.log('3) Add New Task')
        let added_tasks = await driver.findElements(By.css(".added-tasks"))
        const field = await driver.findElement(By.css(".add-task-input"))
        await field.sendKeys("New Task");
        await driver.findElement(By.css(".add-btn")).click();
        added_tasksUpdated = await driver.findElements(By.css(".added-tasks"))
        console.log(added_tasksUpdated.length == added_tasks.length+1);
        
    console.log('4) Verify Newely Added task')
        added_tasks = await driver.findElements(By.css(".added-tasks-input"))
        console.log(await added_tasks[added_tasks.length-1].getText() == "New Task");

    console.log('5) Remove New Added Tasks')
        await driver.findElement(By.css(".remove-task")).click();
        added_tasks = await driver.findElements(By.css(".added-tasks-input"))
        console.log(added_tasks.length == 0);
}
test();
