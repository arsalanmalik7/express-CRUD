import express from 'express';
let router = express.Router();

import postRouter from './route/post.mjs'

router.use(postRouter);



export default router