import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { bookRoutes } from './book.routes';
import { UsersRoutes } from './user.routes';
import { mahrganBookRoutes } from './mahrgan.routes';
import { translationRoutes } from './coptic-translation.routes';
import { statisticsRoutes } from './statistics.routes';

const router: Router = Router();                            

router.use('/users', UsersRoutes); 
router.use('/auth', AuthRoutes); 
router.use('/books', bookRoutes); 
router.use('/mahrgan', mahrganBookRoutes);
router.use('/translation', translationRoutes);
router.use('/statistics', statisticsRoutes);

export const MainRouter: Router = router; 