const puppeteer = require('puppeteer');
const moment = require('moment');
const hours = require('./hours');

exports.itsTimeToVulture = async (droppedShifts) => {
  console.log(droppedShifts)
  const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://scheduler.engr.wisc.edu/worklocation/detail/1-' +  moment(droppedShifts[0].date).format('YYYY-MM-DD'));

  await page.type('#j_username', process.env.USER);
  await page.type('#j_password', process.env.PASS);

  await page.click('button[type=submit]');
  await page.waitForSelector('.footer').then(() => {
    return page.$$eval('.timeslot', (timeslots, week) => {
      week.forEach((day, index) => {
        if (day) {
          day.forEach(shift => {
            timeslots[index].children.item(shift).querySelector('input[name*=schedadd]').setAttribute('checked', true);
          });
        }
      });
    }, getIndices(droppedShifts));
  });
  
  // await page.click('input[type=submit]');
  // await browser.close()
};

function getIndices(shifts) {
  const shiftIndices = [[], [], [], [], [], [], []];
  shifts.forEach(shift => {
    if (isWeekday(shift.date)) {
      let weekdayHours = hours.getHours().weekday;
      weekdayHours.forEach((hour, index) => {
        if (hour === shift.from)
          shiftIndices[moment(shift.date).isoWeekday() - 1].push(index + 1);
      });
    } else if (!isWeekday(shift.date)) {
      let weekendHours = hours.getHours().weekend;
      weekendHours.forEach((hour, index) => {
        if (hour === shift.from)
          shiftIndices[moment(shift.date).isoWeekday() - 1].push(index + 1);
      });
    }
  });
  console.log(shiftIndices);
  return shiftIndices;
}

function isWeekday(day) {
  return !!(2 <= 7 - moment(day).isoWeekday());
}
