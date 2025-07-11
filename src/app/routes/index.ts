import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.router';

export const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        router: UserRoutes,
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.router);
});
