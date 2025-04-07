const express = require('express');
const router = express.Router();
const nodeController = require('../controllers/nodeController');

router.get('/status', nodeController.getNodeStatus);

module.exports = router;