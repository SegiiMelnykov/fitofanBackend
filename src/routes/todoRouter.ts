import Router from 'express'; 
import ToDoController from '../controllers/todoController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, ToDoController.getAll );
router.post('/', authMiddleware, ToDoController.create);
router.get('/:id', authMiddleware, ToDoController.getOne);
router.put('/:id', authMiddleware, ToDoController.update);
router.delete('/:id', authMiddleware, ToDoController.delete);

export default router;