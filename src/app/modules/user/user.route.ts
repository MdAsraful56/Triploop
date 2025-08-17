import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
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
    multerUpload.single('file'),
    UserControllers.updateUser
);

router.get(
    '/all-users',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    UserControllers.getAllUsers
);

export const UserRoutes = router;
