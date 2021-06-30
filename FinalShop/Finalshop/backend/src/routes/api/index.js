import {Router} from 'express';
import productInfoRouter from './ProductInfoRouter.js';

const router = Router();

router.use('/',productInfoRouter);

export default router;