import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Experss {
        interface Request {
            user: JwtPayload;
        }
    }
}
