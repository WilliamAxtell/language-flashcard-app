import express from 'express';
import { getWordsSelection, processAnswers } from '../controllers/words.js';
const router = express.Router();

router.route('/').get(getWordsSelection).patch(processAnswers);

export {router};