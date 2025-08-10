import httpStatus from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import { PaymentStatus } from '../payment/payment.interface';
import { ISSLCommerz } from '../SSLCommerz/SSLCommerz.interface';
import { SSLService } from '../SSLCommerz/SSLCommerz.service';
import { Tour } from '../tour/tour.model';
import { User } from '../user/user.model';
import { Payment } from './../payment/payment.model';
import { BookingStatus, IBooking } from './booking.interface';
import { Booking } from './booking.model';

const getTransactionId = () => {
    return `tran_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const transactionId = getTransactionId();

    const session = await Booking.startSession();

    session.startTransaction();

    try {
        const user = await User.findById(userId);

        if (!user?.phone || !user?.address) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Please Update Your Profile to Book a tour. Your Phone and Address are Important.'
            );
        }

        const tour = await Tour.findById(payload.tour).select('costFrom');

        if (!tour?.costFrom) {
            throw new AppError(httpStatus.NOT_FOUND, ' No Tour cost found');
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const amount = Number(tour?.costFrom) * Number(payload.guestsCount!);

        const booking = await Booking.create(
            [
                {
                    user: userId,
                    status: BookingStatus.PENDING,
                    ...payload,
                },
            ],
            { session }
        );

        const payment = await Payment.create(
            [
                {
                    booking: booking[0]._id,
                    status: PaymentStatus.UNPAID,
                    transactionId,
                    amount,
                },
            ],
            { session }
        );

        const updatedBooking = await Booking.findByIdAndUpdate(
            booking[0]._id,
            { payment: payment[0]._id },
            { new: true, runValidators: true, session }
        )
            .populate('user', 'name email phone address')
            .populate('tour', 'title costFrom')
            .populate('payment');

        const sslPayload: ISSLCommerz = {
            amount: amount,
            transactionId: transactionId,
            name: user.name,
            email: user.email,
            phoneNumber: user.phone,
            address: user.address,
        };

        const SSLPayment = await SSLService.sslPaymentInit(sslPayload);

        await session.commitTransaction(); // commit transaction
        session.endSession();

        return {
            booking: updatedBooking,
            PaymentUrl: SSLPayment.GatewayPageURL,
        };
    } catch (error) {
        await session.abortTransaction(); // rollback transaction
        session.endSession();
        throw error;
    }
};

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
