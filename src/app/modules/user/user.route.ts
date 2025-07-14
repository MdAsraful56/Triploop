import { NextFunction, Request, Response, Router } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/AppError';
import validateRequst from '../../middlewares/validateRequst';
import { verifyToken } from '../../utils/jwt';
import { UserControllers } from './user.controller';
import { createUserZodSchema } from './user.validation';

const router = Router();

const checkAuth =
    (...authRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken) {
                throw new AppError(403, 'No Token Recieved');
            }

            // const verifiedToken = jwt.verify(accessToken, 'secretOrPrivateKey');

            const verifiedToken = verifyToken(
                accessToken,
                envVars.JWT_ACCESS_TOKEN_SECRET
            ) as JwtPayload;

            if (!verifiedToken) {
                throw new AppError(403, 'You are not Authorized');
            }

            if (authRoles.includes(verifiedToken.role)) {
                throw new AppError(
                    403,
                    'You are not Permited to view this route!!!'
                );
            }
            next();
        } catch (error) {
            next(error);
        }
    };

router.post(
    '/register',
    validateRequst(createUserZodSchema),
    UserControllers.createUser
);

router.get(
    '/all-users',
    checkAuth('ADMIN', 'SUPER_ADMIN'),
    UserControllers.getAllUsers
);

export const UserRoutes = router;
