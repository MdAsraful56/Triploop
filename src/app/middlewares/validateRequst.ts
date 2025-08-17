import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequst =
    (zodSchema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // req.body = JSON.parse(req.body.data) || req.body;    /// Way - 01

            // Way - 02
            if (req.body.data) {
                req.body = JSON.parse(req.body.data);
            }
            req.body = await zodSchema.parseAsync(req.body);
            next();
        } catch (error) {
            next(error);
        }
    };

export default validateRequst;
