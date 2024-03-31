/**
 * This function returns the code of the event
 * @param event
 * @returns {string}
 */
const eventCode = (event) => {
  const geo = new RegExp('\\bIDROGEOLOGICO\\b');
  const hydro = new RegExp('\\bIDRAULICO\\b');
  const storm = new RegExp('\\bTEMPORALI\\b');
  if (hydro.test(event)) {
    return 'hydro';
  } else if (geo.test(event)) {
    return 'geo';
  } else if (storm.test(event)) {
    return 'storm';
  }
  return 'error';
};

module.exports = eventCode;
