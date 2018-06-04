let timeago = require("../libs/timeago/src/timeago.js");
const timeagoInstance = timeago(null, 'zh_CN'); 

function formatTime(date) {
  return timeagoInstance.format(date);
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
