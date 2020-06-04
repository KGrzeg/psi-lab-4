function toFixed(number, precision) {
  const pow = 10 ** precision;
  return (number * pow).toFixed() / pow;
}

function padString(msg, length, filler = "0") {
  if (msg.toString().length < length)
    return filler.repeat(length - msg.toString().length) + msg.toString();
  return msg.toString();
}

function getTime() {
  const time = new Date();

  const h = padString(time.getHours(), 2);
  const m = padString(time.getMinutes(), 2);
  const s = padString(time.getSeconds(), 2);
  const ms = padString(time.getMilliseconds(), 3);

  return [h, m, s, ms].join(":");
}

module.exports = {
  toFixed,
  getTime,
};
