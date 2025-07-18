import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import validateRequst from '../../middlewares/validateRequst';
import { UserControllers } from './user.controller';
import { Role } from './user.interface';
import { createUserZodSchema, updateUserZodSchema } from './user.validation';

const router = Router();

router.post(
    '/register',
    validateRequst(createUserZodSchema),
    UserControllers.createUser
);

router.patch(
    '/:id',
    validateRequst(updateUserZodSchema),
    checkAuth(...Object.values(Role)),
    UserControllers.updateUser
);

router.get(
    '/all-users',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    UserControllers.getAllUsers
);

export const UserRoutes = router;
