const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const EXTRACTION_PATH = './uploads/ext/';
const EXIT_PATH = './submission/';

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

const updateEventData = async () => {
  fs.readdir(EXTRACTION_PATH, (err, files) => {
    files
      .filter((file) => file.startsWith('Cap_'))
      .forEach((file) => {
        fs.readFile(`${EXTRACTION_PATH}${file}`, 'utf8', (err, data) => {
          parser.parseString(data, async (err, result) => {
            const alert = result.alert;
            const infoAlert = result.alert.info;
            const sectors = [];
            const alerts = [];
            if (infoAlert) {
              for (const info of infoAlert) {
                const arealArray = info.area;
                for (const area of arealArray) {
                  sectors.push({
                    code: area.geocode[0].value.toString(),
                    description: area.areaDesc.toString() || '',
                  });
                  alerts.push({
                    identifier: alert.identifier.toString(),
                    type: eventCode(info.event.toString()),
                    event: info.event.toString(),
                    urgency: info.urgency.toString(),
                    severity: info.severity.toString(),
                    certainty: info.certainty.toString(),
                    location_code: area.geocode[0].value.toString(),
                    location_desc: area.areaDesc.toString() || '',
                    onset: info.onset.toString(),
                    expires: info.expires.toString(),
                    received: alert.sent.toString(),
                  });
                }
              }
            }
            if (sectors.length > 0) {
              console.log(`Creating sectors file with ${sectors.length}`);
              fs.writeFile(
                `${EXIT_PATH}sectors.json`,
                JSON.stringify(sectors),
                (err) => {
                  if (err) {
                    console.error(err);
                  }
                },
              );
            }
            if (alerts.length > 0) {
              console.log(`Creating alerts file with ${alerts.length}`);
              fs.writeFile(
                `${EXIT_PATH}alerts.json`,
                JSON.stringify(alerts),
                (err) => {
                  if (err) {
                    console.error(err);
                  }
                },
              );
            }
          });
        });
      });
  });
};

module.exports = {
  updateEventData,
};
