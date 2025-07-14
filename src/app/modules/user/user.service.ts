import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/AppError';
import { IAuthProvider, IUser } from './user.interface';
import { User } from './user.model';

// create a user service that handles user-related operations
const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User Already Exist...');
    }

    const hashedPassword = await bcryptjs.hash(
        password as string,
        envVars.BCRYPT_SALT_ROUNDS
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
    getAllUsers,
};
