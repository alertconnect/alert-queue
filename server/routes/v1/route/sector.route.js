const express = require('express');
const sectorController = require('../../../controllers/sector.controller');

const router = express.Router();

router.route('/').get(sectorController.getSectors);

module.exports = router;
