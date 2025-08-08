import { model, Schema } from 'mongoose';
import { BookingStatus, IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        tour: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
        payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
        guestsCount: { type: Number, required: true, min: 1 },
        status: {
            type: String,
            enum: Object.values(BookingStatus),
            default: BookingStatus.PENDING,
        },
    },
    { timestamps: true }
);

export const Boking = model<IBooking>('Booking', bookingSchema);
