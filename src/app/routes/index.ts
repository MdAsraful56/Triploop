import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DivisionRoutes } from '../modules/division/division.route';
import { UserRoutes } from '../modules/user/user.route';

export const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        router: UserRoutes,
    },
    {
        path: '/auth',
        router: AuthRoutes,
    },
    {
        path: '/division',
        router: DivisionRoutes,
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.router);
});
