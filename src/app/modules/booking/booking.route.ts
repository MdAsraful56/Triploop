import express from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import validateRequst from '../../middlewares/validateRequst';
import { Role } from '../user/user.interface';
import { BookingController } from './booking.controller';
import {
    createBookingZodSchema,
    updateBookingZodSchema,
} from './booking.validation';

const router = express.Router();

// api/v1/booking
router.post(
    '/',
    checkAuth(...Object.values(Role)),
    validateRequst(createBookingZodSchema),
    BookingController.createBooking
);

// api/v1/booking
router.get(
    '/',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    BookingController.getAllBookings
);

// api/v1/booking/my-bookings
router.get(
    '/my-bookings',
    checkAuth(...Object.values(Role)),
    BookingController.getUserBookings
);

// api/v1/booking/bookingId
router.get(
    '/:bookingId',
    checkAuth(...Object.values(Role)),
    BookingController.getSingleBooking
);

// api/v1/booking/bookingId/status
router.patch(
    '/:bookingId/status',
    checkAuth(...Object.values(Role)),
    validateRequst(updateBookingZodSchema),
    BookingController.updateBookingStatus
);

router.delete(
    '/:bookingId',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    BookingController.deleteBooking
);

export const BookingRoutes = router;
