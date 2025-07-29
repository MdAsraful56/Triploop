import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/AppError';
import { IAuthProvider, IUser, Role } from './user.interface';
import { User } from './user.model';

// create a user service that handles user-related operations
const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User Already Exist...');
    }

    // const saltRounds = parseInt(envVars.BCRYPT_SALT_ROUNDS, 10);
    // const hashedPassword = await bcryptjs.hash(password as string, saltRounds);

    const hashedPassword = await bcryptjs.hash(
        password as string,
        Number(envVars.BCRYPT_SALT_ROUNDS)
    );

    const authProvider: IAuthProvider = {
        provider: 'credential',
        providerId: email as string,
    };

    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest,
    });
    return user;
};

// update user

const updateUser = async (
    userId: string,
    payload: Partial<IUser>,
    decodedToken: JwtPayload
) => {
    const ifUserExist = await User.findById(userId);

    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (payload.role) {
        if (
            decodedToken.role === Role.USER ||
            decodedToken.role === Role.GUIDE
        ) {
            throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
        }

        if (
            payload.role === Role.SUPER_ADMIN &&
            decodedToken.role === Role.ADMIN
        ) {
            throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (
            decodedToken.role === Role.USER ||
            decodedToken.role === Role.GUIDE
        ) {
            throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
        }
    }

    if (payload.password) {
        payload.password = await bcryptjs.hash(
            payload.password,
            Number(envVars.BCRYPT_SALT_ROUNDS)
        );
    }

    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });

    return newUpdateUser;
};

// get all users

const getAllUsers = async () => {
    const users = await User.find();
    const totalUsers = await User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUsers,
        },
    };
};

export const UserService = {
    createUser,
    updateUser,
    getAllUsers,
};
