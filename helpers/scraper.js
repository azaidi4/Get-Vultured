/* eslint-disable no-unused-expressions */

const puppeteer = require('puppeteer');
const moment = require('moment');
const hours = require('./hours');

exports.itsTimeToVulture = async (droppedShifts) => {
  const droppedWeek = moment(droppedShifts[0].date).format('YYYY-MM-DD');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://scheduler.engr.wisc.edu/worklocation/detail/1-' + droppedWeek);

  await page.type('#j_username', process.env.USER);
  await page.type('#j_password', process.env.PASS);

  await Promise.all([
    page.waitForSelector('.footer'),
    page.click('button[type=submit]'),
  ]);

  await page.$$eval('.timeslot', (timeslots, week) => {
    week.forEach((day, index) => {
      if (day) {
        day.forEach(shift => {
          timeslots[index].children.item(shift)
          .querySelector('input[name*=schedadd]').setAttribute('checked', true);
        });
      }
    });
  }, getIndices(droppedShifts, droppedWeek));

  await page.click('input[type=submit]');
  await browser.close();
};

function getIndices(shifts, weekStart) {
  const shiftIndices = [[], [], [], [], [], [], []];
  shifts.forEach(shift => {
    if (isWeekday(shift.date)) {
      let weekdayHours = hours.getHours(weekStart).weekday;
      weekdayHours.forEach((hour, index) => {
        if (hour === shift.from) {
          shiftIndices[moment(shift.date).isoWeekday() - 1].push(index + 1);
        }
      });
    } else if (!isWeekday(shift.date)) {
      let weekendHours = hours.getHours(weekStart).weekend;
      weekendHours.forEach((hour, index) => {
        if (hour === shift.from) {
          shiftIndices[moment(shift.date).isoWeekday() - 1].push(index + 1);
        }
      });
    }
  });
  console.log(shifts, shiftIndices);
  return shiftIndices;
}

function isWeekday(day) {
  return !!(7 - moment(day).isoWeekday() >= 2);
}
