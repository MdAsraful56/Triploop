import { NextFunction, Request, Response } from 'express';
import { envVars } from '../config/env';
import AppError from '../errorHelpers/AppError';

export const globalErrorHandler = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    let statusCode = 500;
    let message = `Something went wrong: ${err.message}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorSources: any = [
        // {
        //     path: 'isDeleted',
        //     message: 'Cast Failed',
        // },
    ];

    //duplicate error
    if (err.code === 11000) {
        const matchedArray = err.message.match(/"([^"]*)"/);
        statusCode = 400;
        message = `${matchedArray[1]} already exists`;
    }
    // Object Id Cast error
    else if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}. Please provide a valid ${err.path}.`;
    }
    // Zod validation error
    else if (err.name === 'ZodError') {
        statusCode = 400;
        message = 'Zod Validation error occurred. Please check your input.';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err.issues.forEach((issue: any) => {
            errorSources.push({
                path: issue.path[issue.path.length - 1], // Get the last part of the path
                message: issue.message,
            });
        });
    }
    // validation error
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = Object.values(err.errors);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errors.forEach((errorObject: any) =>
            errorSources.push({
                path: errorObject.path,
                message: errorObject.message,
            })
        );
        message = 'Validation error occurred. Please check your input.';
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: err,
        stack: envVars.NODE_ENV === 'development' ? err.stack : null,
    });
};
