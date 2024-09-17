import express from 'express';
import { getWordsSelection, processAnswers, addWord, deleteWord } from '../controllers/words.js';
const router = express.Router();

router.route('/').get(getWordsSelection).patch(processAnswers).post(addWord).delete(deleteWord);

export {router};