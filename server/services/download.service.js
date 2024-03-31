const AdmZip = require('adm-zip');
const request = require('request');
const fs = require('fs');
const fsExtra = require('fs-extra');
const updaterService = require('../services/updater.service');
const logger = require('../utils/logger');

const FILE_URL =
  'https://raw.githubusercontent.com/pcm-dpc/DPC-Bollettini-Criticita-Idrogeologica-Idraulica/master/files/all/latest_all.zip';
const FILE_NAME = 'latest_all.zip';
const FILE_FS_PATH = `./uploads/${FILE_NAME}`;
const EXTRACTION_PATH = './uploads/ext/';

/**
 * @description - Download the latest zip file and extract it
 * @returns {Promise<void>}
 */
const downloadLatestZip = async () => {
  await new Promise((resolve, reject) => {
    deleteDirectoryContents(EXTRACTION_PATH);

    request({ url: FILE_URL, encoding: null })
      .pipe(fs.createWriteStream(FILE_FS_PATH))
      .on('finish', () => {
        logger.info(`The file is finished downloading.`);
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  }).catch((error) => {
    logger.error(`Something happened: ${error}`);
  });

  const zip = new AdmZip(FILE_FS_PATH, {});
  zip.extractAllTo(EXTRACTION_PATH, true, false, '');

  await updaterService.updateEventData();
};

/**
 * @description - Delete all files and directories in a given directory
 * @param {String} directoryPath
 * @returns {Promise<void>}
 */
async function deleteDirectoryContents(directoryPath) {
  try {
    fsExtra.emptyDir(directoryPath);
    logger.info(`Contenuto della directory ${directoryPath} eliminato`);
  } catch (err) {
    logger.error({
      message: "Errore durante l'eliminazione della directory di destinazione",
      error: err,
    });
  }
}

module.exports = {
  downloadLatestZip,
};
