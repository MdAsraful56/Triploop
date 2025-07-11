import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).json({
            message: 'User created Successful',
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const UserControllers = {
    createUser,
};
