import express from 'express';

const router = express.Router();

// router.get(
//     '/',
//     checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
//     BookingController.getAllBookings
// );

export const BookingRoutes = router;
