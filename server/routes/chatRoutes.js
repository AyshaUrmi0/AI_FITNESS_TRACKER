const express = require('express');
const router = express.Router();
const { processChat } = require('../controllers/chatController');

router.post('/', processChat);

module.exports = router;
