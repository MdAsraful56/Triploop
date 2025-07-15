import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

// create user using try catch

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await UserService.createUser(req.body);
//         res.status(201).json({
//             message: 'User created Successful',
//             user,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

const createUser = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await UserService.createUser(req.body);

        // res.status(httpStatus.CREATED).json({
        //     message: 'User Create Successfully',
        //     user,
        // });

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'User Create Successfully',
            data: user,
        });
    }
);

//update user
const updateUser = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;
        // const token = req.headers.authorization;
        // const verifiedToken = verifyToken(
        //     token as string,
        //     envVars.JWT_ACCESS_TOKEN_SECRET
        // ) as JwtPayload;
        const verifiedToken = req.user;
        const payload = req.body;

        const user = await UserService.updateUser(
            userId,
            payload,
            verifiedToken
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'User Update Successfully',
            data: user,
        });
    }
);

const getAllUsers = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await UserService.getAllUsers();

        // res.status(httpStatus.OK).json({
        //     success: true,
        //     message: 'All User get Successfully',
        //     users,
        // });

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'User Create Successfully',
            data: result.data,
            meta: result.meta,
        });
    }
);

export const UserControllers = {
    createUser,
    updateUser,
    getAllUsers,
};
