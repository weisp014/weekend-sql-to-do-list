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
    const sqlText = 'SELECT * FROM "tasks" ORDER by "id";';
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});

//TODO PUT

// POST
router.post('/', (req, res) => {
    const newTask = req.body;
    console.log('Adding task:', newTask);
    const sqlText = `INSERT INTO "tasks" ("description") VALUES ($1);`;
    pool.query(sqlText, [newTask.description])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making database query: ${sqlText}`, error);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    console.log('inside delete request');
    const idToDelete = req.params.id;
    const sqlText = `DELETE FROM "tasks" WHERE "id"=$1;`;
    pool.query(sqlText, [idToDelete])
    .then((result) => {
        console.log('Delete successful');
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`Error making database query: ${sqlText}`, error);
    });
});

module.exports = router;