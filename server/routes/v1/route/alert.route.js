const express = require('express');
const validate = require('../../../middlewares/validate');
const alertController = require('../../../controllers/alert.controller');
const alertValidation = require('../../../validations/alert.validation');

const router = express.Router();

router
  .route('/')
  .get(validate(alertValidation.query), alertController.getGeoActiveAlert)

router
  .route('/refresh')
  .post(alertController.refreshAlert)

module.exports = router;
