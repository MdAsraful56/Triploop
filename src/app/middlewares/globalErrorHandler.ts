import { NextFunction, Request, Response } from 'express';
import { envVars } from '../config/env';
import AppError from '../errorHelpers/AppError';

export const globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    let statusCode = 500;
    let message = `Something went wrong: ${err.message}`;

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        error: err,
        stack: envVars.NODE_ENV === 'development' ? err.stack : null,
    });
};
