const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET BOOKING');
});

module.exports = router;