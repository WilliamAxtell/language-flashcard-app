import express from 'express';
import { getWordsSelection, processAnswers, deleteWord } from '../controllers/words.js';
const router = express.Router();

router.route('/').get(getWordsSelection).patch(processAnswers).delete(deleteWord);

export {router};