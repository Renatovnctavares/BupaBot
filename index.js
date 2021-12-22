const playwright = require('playwright');

const baseUrl = 'https://bmvs.onlineappointmentscheduling.net.au/oasis/Default.aspx';

// const search = {
//   postCode: 2000,
//   state: 'NSW'
// };

const month = '01';

async function checkLocation(locationName, locationCode, postCode, state){
  try {
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
  
    await page.goto(baseUrl);
  
    await page.click('button.select-book-type-button');
  
    await page.waitForLoadState('networkidle');
  
    await page.fill('#ContentPlaceHolder1_SelectLocation1_txtSuburb', postCode);
  
    await page.selectOption('select#ContentPlaceHolder1_SelectLocation1_ddlState', state);
  
    await Promise.all([
      page.click('div > .inner-block > .clinic-search-outer > .postcode-search > .blue-button'),
      page.waitForNavigation(),
    ]);
  
    await page.click(locationCode);
  
    await Promise.all([
      page.click('#ContentPlaceHolder1_btnCont'),
      page.waitForNavigation()
    ]);
  
    await page.click('#chkClass1_489');
  
    await page.click('#chkClass1_492');
  
    await Promise.all([
      page.click('#ContentPlaceHolder1_btnCont'),
      page.waitForNavigation()
    ]);
  
    const date = await page.inputValue("input#ContentPlaceHolder1_SelectTime1_txtAppDate");

    let time = null;
    try {
      time = await page.$eval('label[for="ContentPlaceHolder1_SelectTime1_rblResults_0"]', (el) => {
        if(el.innerHTML) return el.innerHTML
      })
    } catch (error) {
      time = null;
    }

    if(date){
      if(date.match(`${month}`) && time) {

        console.log(`⚠️  ${locationName}: ${date} at ${time}`);
      } else {
        console.log(`${locationName}: ${date}`);
      } 
    }
    else {
      console.log(`No dates for ${locationName}.`)
    }
  
    await browser.close();
  } catch (error) {
    console.log(error)
  }
}

// Sydney
checkLocation('Sydney', '#rbLocation168', '2000', 'NSW');

// Bondi
checkLocation('Bondi', '#rbLocation166', '2000', 'NSW');

// Parramatta
checkLocation('Parramatta', '#rbLocation60', '2000', 'NSW');

// Wollongong
checkLocation('Wollongong', '#rbLocation131', '2000', 'NSW');

// Newcastle
checkLocation('Newcastle', '#rbLocation148', '2000', 'NSW');

// Baulkham Hills
checkLocation('Baulkham Hills', '#rbLocation130', '2000', 'NSW');

// Bankstown
checkLocation('Bankstown', '#rbLocation170', '2000', 'NSW');

// Corrimal
checkLocation('Corrimal', '#rbLocation131', '2000', 'NSW');

// Robina
// checkLocation('Robina', '#rbLocation142', '2485', 'NSW');

// // Brisbane
// checkLocation('Brisbane', '#rbLocation61', '2485', 'NSW');

// // Toowoomba
// checkLocation('Toowoomba', '#rbLocation155', '2485', 'NSW');

