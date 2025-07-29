import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import validateRequst from '../../middlewares/validateRequst';
import { Role } from '../user/user.interface';
import { DivisionControllers } from './division.controller';
import { createDivisionSchema } from './division.validation';

const router = Router();

router.post(
    '/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequst(createDivisionSchema),
    DivisionControllers.createDivision
);

export const DivisionRoutes = router;
