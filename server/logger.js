const winston = require('winston');
winston.level = 'info';

exports.log = msg => {
  winston.log('info', `${getDateString()} ${msg}`);
};

exports.error = msg => {
  winston.log('error', `${getDateString()} ${msg}`);
};

function getDateString() {
  const now = new Date();
  return `${now.getYear() + 1900}-${pad(now.getUTCMonth()+1)}-${pad(now.getUTCDate())} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
}

function pad(v) {
  return v < 10 ? '0' + v : v;
}
