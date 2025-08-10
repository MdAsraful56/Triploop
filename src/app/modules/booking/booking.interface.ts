import { Types } from 'mongoose';

export enum BookingStatus {
    PENDING = 'pending',
    COMFIRMED = 'comfirmed',
    CANCELLED = 'cancelled',
    FAILED = 'FAILED',
}

export interface IBooking {
    user: Types.ObjectId;
    tour: Types.ObjectId;
    payment?: Types.ObjectId;
    guestsCount: number;
    status: BookingStatus;
}
