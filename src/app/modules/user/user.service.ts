import { IUser } from './user.interface';
import { User } from './user.model';

// create a user service that handles user-related operations
const createUser = async (payload: Partial<IUser>) => {
    const { name, email } = payload;
    const user = await User.create({
        name,
        email,
    });
    return user;
};

// get all users

const getAllUsers = async () => {
    const users = await User.find();
    return users;
};

export const UserService = {
    createUser,
    getAllUsers,
};
