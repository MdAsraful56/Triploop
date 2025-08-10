import express from 'express';
import { Role } from '../user/user.interface';
import { checkAuth } from './../../middlewares/checkAuth';

const router = express.Router();

router.get(
    '/',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    BookingController.getAllBookings
);

export const BookingRoutes = router;
