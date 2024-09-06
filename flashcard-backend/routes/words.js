import express from 'express';
import { getWordsSelection } from '../controllers/words.js';
const router = express.Router();

router.route('/').get(getWordsSelection);

export {router};