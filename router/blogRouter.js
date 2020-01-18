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
                error: "The posts information could not be retrieved."
            })
        });
});

router.get('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        });
});

router.post('/', (req, res) => {
    const {title, contents} = req.body;

    if (!title || !contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    db.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({
                error: "There was an error while saving the post to the database"
            })
        })
})

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(deleteUser => {
            if (deleteUser) {
                res.status(204).end()
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist." 
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const {title, contents} = req.body;

    if (!title || !contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    db.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }            
        })
        .catch(error => {
            res.status(500).json({
                error: "The post information could not be modified."
            })
        })
})

module.exports = router