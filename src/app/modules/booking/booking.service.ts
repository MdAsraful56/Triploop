import { IBooking } from './booking.interface';

const createBooking = async (payload: IBooking) => {};

const getUserBookings = async (userId: string) => {};

const getAllBookings = async () => {};

const getBookingById = async (id: string) => {};

const updateBooking = async (id: string, payload: IBooking) => {};

const deleteBooking = async (id: string) => {};

export const BookingService = {
    createBooking,
    getUserBookings,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};
