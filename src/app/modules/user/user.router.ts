import { Router } from 'express';
import validateRequst from '../../middlewares/validateRequst';
import { UserControllers } from './user.controller';
import { createUserZodSchema } from './user.validation';

const router = Router();

router.post(
    '/register',
    validateRequst(createUserZodSchema),
    UserControllers.createUser
);

router.get('/all-users', UserControllers.getAllUsers);

export const UserRoutes = router;
