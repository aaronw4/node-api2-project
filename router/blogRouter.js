const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.find(req.query)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error'
            })
        });
});

module.exports = router