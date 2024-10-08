import {db} from '../connect.js';


const getWordsSelection = async (req, res)=>{
    const wordsToFetch = req.query.num_words;
    const dateLimit = req.query.date_limit;
    res.set('content-type', 'application/json');
    
    const sql = `
    SELECT * FROM words
    WHERE next_fetch <= ${dateLimit}
    LIMIT ${wordsToFetch}
        `;

    let data = [];
    try {
        db.all(sql, [], (err, rows)=>{
            if(err){
                throw err;
            }
            rows.forEach((row)=>{
                data.push({
                    id: row.id,
                    word: row.word,
                    meaning: row.meaning,
                    fetch_pause_length: row.fetch_pause_length,
                    next_fetch: row.next_fetch
                });
            });
            let content = JSON.stringify(data);
            res.send(content);
        })
    } catch (err) {
        console.log(err.message);
        res.status(467);
        res.send(`{"code": 467, "status": "${err.message}"}`);
    }
};

const processAnswers = async (req, res)=>{
    try {
        const updateWord = req.body;
        const fetchBase = Date.now();
        const pauseDict = {
            0: 86400000,
            1: 604800000,
            2: 1382400000,
            3: 3024000000,
        };

        if (!updateWord.correct) {
            updateWord.next_fetch = fetchBase + 86400000;
            if (updateWord.fetch_pause_length > 0) {
                updateWord.fetch_pause_length--;
            }
        } else {
            updateWord.next_fetch = fetchBase + pauseDict[updateWord.fetch_pause_length];
            if (updateWord.fetch_pause_length < 4) {
                updateWord.fetch_pause_length++
            };
        }

        const sql = `
            UPDATE words
            SET fetch_pause_length = ?,
                next_fetch = ?
            WHERE id = ?
            `;

        db.run(sql, [updateWord.fetch_pause_length, updateWord.next_fetch, updateWord.id], function(err){
            if(err){
                throw err;
            }
            res.status(201);
            let data = {
                status: 201,
                message: `Word with id ${updateWord.id} updated`,
                fetch_pause_length: updateWord.fetch_pause_length,
                next_fetch: updateWord.next_fetch
            };
            res.send(JSON.stringify(data));
        });

    } catch (error) {
        console.log(err.message);
        res.status(468);
        res.send(`{"code": 468, "status": "${err.message}"}`);        
    }
};

const addWord = async (req, res)=>{
    const newWord = req.body;
    res.set('content-type', 'application/json');
    const sql = 'INSERT INTO words(word, meaning, fetch_pause_length, next_fetch) VALUES(?, ?, ?, ?)';
    const nextFetch = Date.now();
    try{
        db.run(sql, [newWord[0], newWord[1], 0, nextFetch], async function(err){
            if(err){
                throw err;
            }
            res.status(201);
            const addWordRes = await checkAddition();
            console.log(addWordRes);
            res.send(JSON.stringify({status: 201, message: addWordRes}));
        })  
    } catch (err) {
        console.log(err.message);
        res.status(468);
        res.send(`{"code": 468, "status": "${err.message}"}`);
    }
};

const deleteWord = async (req, res)=>{
    res.set('content-type', 'application/json');
    const sql = 'DELETE FROM words WHERE id = ?';
    try {
        db.run(sql, [req.body.id], function(err){
            if (err){
                throw err;
            }
            if (this.changes === 1) {
                res.status(200);
                res.send(`{"code": 200, "status": "Word deleted"}`);
            } else {
                res.status(404);
                res.send(`{"code": 404, "status": "Word not found"}`);
            }
        })
    } catch(err) {
        console.log(err.message);
        res.status(469);
        res.send(`{"code": 469, "status": "${err.message}"}`);
    }

};

const checkAddition = async ()=>{
    return new Promise((resolve, reject) => {
    const lastFiveWordsSQL = `
            SELECT * FROM words
            ORDER BY id DESC
            LIMIT 5
            `;

    let lastFive = [];
    db.all(lastFiveWordsSQL, [], (err, rows)=>{
        if(err){
            reject(err);
        }
        rows.forEach((row) => {
            lastFive.push({
                id: row.id,
                word: row.word,
                meaning: row.meaning,
                fetch_pause_length: row.fetch_pause_length,
                next_fetch: row.next_fetch
            });
        });
        resolve(lastFive);
    });
  });
};

export {getWordsSelection, processAnswers, addWord, deleteWord};