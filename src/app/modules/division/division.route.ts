import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';

import { multerUpload } from '../../config/multer.config';
import validateRequst from '../../middlewares/validateRequst';
import { Role } from '../user/user.interface';
import { DivisionController } from './division.controller';
import {
    createDivisionSchema,
    updateDivisionSchema,
} from './division.validation';

const router = Router();

router.post(
    '/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.single('file'),
    validateRequst(createDivisionSchema),
    DivisionController.createDivision
);
router.get('/', DivisionController.getAllDivisions);
router.get('/:slug', DivisionController.getSingleDivision);
router.patch(
    '/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.single('file'),
    validateRequst(updateDivisionSchema),
    DivisionController.updateDivision
);
router.delete(
    '/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    DivisionController.deleteDivision
);

export const DivisionRoutes = router;
