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

// app.post('/api/v1', (req, res)=>{
//     res.set('conetent-type', 'application/json');
//     const sql = 'INSERT INTO words(word, meaning, fetch_pause_length, next_fetch) VALUES(?, ?, ?, ?)';
//     let newId;
//     let nextFetch = Date.now();
//     try{
//         db.run(sql, [req.body.word, req.body.meaning, req.body.part_of_speech, req.body.word_category, 0, nextFetch], function(err){
//             if(err){
//                 throw err;
//             }
//             newId = this.lastID;
//             res.status(201);
//             let data = {status: 201, message: `Word added with id ${newId}`};
//             let content = JSON.stringify(data);
//             res.send(content);
//         })  
//     } catch (err) {
//         console.log(err.message);
//         res.status(468);
//         res.send(`{"code": 468, "status": "${err.message}"}`);
//     }
// });

// app.patch('/api/v1', (req, res)=>{
//     console.log(req.body);
//     res.set('conetent-type', 'application/json');
//     const responseObject = {
//         message: "Word updated",
//         success: true
//     };
//     res.send(JSON.stringify(responseObject));
// });

// app.delete('/api/v1', (req, res)=>{
//     res.set('conetent-type', 'application/json');
//     const sql = 'DELETE FROM words WHERE id = ?';
//     try {
//         db.run(sql, [req.query.id], function(err){
//             if (err){
//                 throw err;
//             }
//             if (this.changes === 1) {
//                 res.status(200);
//                 res.send(`{"code": 200, "status": "Word deleted"}`);
//             } else {
//                 res.status(404);
//                 res.send(`{"code": 404, "status": "Word not found"}`);
//             }
//         })
//     } catch(err) {
//         console.log(err.message);
//         res.status(469);
//         res.send(`{"code": 469, "status": "${err.message}"}`);
//     }

// });

export {getWordsSelection};