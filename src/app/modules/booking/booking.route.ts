import express from 'express';
import { Role } from '../user/user.interface';
import { checkAuth } from './../../middlewares/checkAuth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.get(
    '/',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    BookingController.getAllBookings
);

export const BookingRoutes = router;
