import Router from 'express'; 
const router = Router();
import userRouter from './userRouter';
import todoRouter from './todoRouter';



router.use('/user', userRouter);
router.use('/tasks', todoRouter);


export default router;