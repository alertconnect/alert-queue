const express = require('express');
const groupRoute = require('./route/group.route');
const alertRoute = require('./route/alert.route');
const sectorRoute = require('./route/sector.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/group',
    route: groupRoute,
  },
  {
    path: '/alert',
    route: alertRoute,
  },
  {
    path: '/sector',
    route: sectorRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
