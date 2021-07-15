const express = require('express');
const validate = require('../../../middlewares/validate');
const sectorController = require('../../../controllers/sector.controller');
const genericValidation = require('../../../validations/generic.validation');

const router = express.Router();

router
  .route('/')
  .get(validate(genericValidation.query), sectorController.getSectors)

module.exports = router;
