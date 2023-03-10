const { Router } = require('express');
const express = require('express');
const router = express.Router();
const pg = require('pg');

// DB connection
const pool = new pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432
});

// GET
router.get('/', (req, res) => {
    let sqlText = 'SELECT * FROM "tasks" ORDER by "id";';
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});

// TODO POST

// TODO DELETE

module.exports = router;