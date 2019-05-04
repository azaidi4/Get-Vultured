const moment = require("moment"),
  _NOW = moment(),
  __SEMESTER__ = {
    weekday: ["8:00am", "8:50am", "9:55am", "11:00am", "12:05pm", "1:20pm", "2:25pm", "3:30pm", "4:35pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm"],
    weekend: ["8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm"]
  },
  __SUMMER__ = {
    weekday: __SEMESTER__.weekday.slice(0, 9),
    weekend: __SEMESTER__.weekend.slice(4, 10)
  },
  __SPRING__ = {
    weekday: ["9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm"],
    weekend: __SUMMER__.weekend
  },
  __FINALS__ = {
    weekday: __SEMESTER__.weekend,
    weekend: __SEMESTER__.weekend.slice(0, 10)
  },
  __AFTER_FINALS__ = {
    weekday: __SPRING__.weekday,
    weekend: __SPRING__.weekend
  };
exports.getHours = function () {
  return _NOW.isBetween("2019-05-05", "2019-05-13") ? __FINALS__ : _NOW.isBetween("2019-05-12", "2019-06-20") ? __AFTER_FINALS__ : _NOW.isBetween("2019-06-19", "2019-09-02") ? __SUMMER__ : __SEMESTER__
};
