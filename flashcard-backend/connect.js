import sqlite3 from 'sqlite3';
import seedWords from './seed-pack.js';

const sql3 = sqlite3.verbose();
const db = new sql3.Database('./norskord.db', sqlite3.OPEN_READWRITE, connected);

function connected(err){
    if(err){
        console.log(err.message);
        return;
    }
    console.log('Connected to the norskord database.');
}

db.run(`DROP TABLE words`, [], (err)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log('Table dropped.');
});

// db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='words';`, (err, row) => {

//     if (err) {
//         console.error(err.message);
//         throw err;
//     }

//     if (row !== undefined) {return;}

//     db.serialize(() => {

//         const sql = `CREATE TABLE IF NOT EXISTS words(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             word TEXT NOT NULL,
//             meaning TEXT NOT NULL,
//             fetch_pause_length INTEGER NOT NULL,
//             next_fetch TEXT NOT NULL
//         )`;

//         db.run(sql, [], (err)=>{
//             if(err){
//                 console.log(err.message);
//                 return;
//             }
//             console.log('Table created.');
//         });

//         const stmt = db.prepare(`INSERT INTO words(word, meaning, fetch_pause_length, next_fetch) VALUES(?, ?, ?, ?)`);

//         const fetchInit = Date.now();

//         for (let i = 0; i < seedWords.length; i++) {
//             stmt.run(seedWords[i][0], seedWords[i][1], 0, fetchInit);
//         }

//         stmt.finalize((err) => {
//             if (err) {
//                 console.error(err.message);
//                 throw err;
//             }
//             console.log('Initial data inserted.');
//         });
//     });
// });

export {db};