import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
    PORT: string;
    MONGODB_URL: string;
    NODE_ENV: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_EXPIRATION_TIME: string;
    BCRYPT_SALT_ROUNDS: string;
    SUPER_ADMIN_EMAIL: string;
    SUPER_ADMIN_PASSWORD: string;
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables = [
        'PORT',
        'MONGODB_URL',
        'NODE_ENV',
        'JWT_ACCESS_TOKEN_SECRET',
        'JWT_ACCESS_EXPIRATION_TIME',
        'BCRYPT_SALT_ROUNDS',
        'SUPER_ADMIN_EMAIL',
        'SUPER_ADMIN_PASSWORD',
    ];

    requiredEnvVariables.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    });
    return {
        PORT: process.env.PORT as string,
        MONGODB_URL: process.env.MONGODB_URL as string,
        NODE_ENV: process.env.NODE_ENV as string,
        JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
        JWT_ACCESS_EXPIRATION_TIME: process.env
            .JWT_ACCESS_EXPIRATION_TIME as string,
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    };
};

export const envVars = loadEnvVariables();
