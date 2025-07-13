import z from 'zod';
import { IsActive, Role } from './user.interface';

export const createUserZodSchema = z.object({
    name: z
        .string({ invalid_type_error: 'Name must be string..' })
        .min(2, { message: "It's too short." })
        .max(50, { message: "It's too long" }),
    email: z
        .string({ invalid_type_error: 'Email must be string.' })
        .email({ message: 'Invalid email adderss formet.' })
        .min(5, { message: 'at laest 5 characters long' })
        .max(100, { message: "It's too long" }),
    password: z
        .string({ invalid_type_error: 'Password must be string' })
        .min(8, {
            message: 'Password must be at least 8 characters long',
        })
        .regex(/[A-Z]/, {
            message: 'Must include at least one uppercase letter',
        })
        .regex(/[a-z]/, {
            message: 'Must include at least one lowercase letter',
        })
        .regex(/[0-9]/, { message: 'Must include at least one number' })
        .regex(/[@$!%*?&]/, {
            message: 'Must include at least one special character',
        }),
    phone: z
        .string({ invalid_type_error: 'Phone must be string' })
        .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
            message: 'Only valid for Bangladesh. Format: +8801 or 01',
        })
        .optional(),
    address: z
        .string({ invalid_type_error: 'Adderss must be string.' })
        .max(200, { message: "Adderss can't exceed 200 charccters." })
        .optional(),
});
export const updateUserZodSchema = z.object({
    name: z
        .string({ invalid_type_error: 'Name must be string..' })
        .min(2, { message: "It's too short." })
        .max(50, { message: "It's too long" })
        .optional(),
    password: z
        .string({ invalid_type_error: 'Password must be string' })
        .min(8, {
            message: 'Password must be at least 8 characters long',
        })
        .regex(/[A-Z]/, {
            message: 'Must include at least one uppercase letter',
        })
        .regex(/[a-z]/, {
            message: 'Must include at least one lowercase letter',
        })
        .regex(/[0-9]/, { message: 'Must include at least one number' })
        .regex(/[@$!%*?&]/, {
            message: 'Must include at least one special character',
        })
        .optional(),
    phone: z
        .string({ invalid_type_error: 'Phone must be string' })
        .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
            message: 'Only valid for Bangladesh. Format: +8801 or 01',
        })
        .optional(),
    address: z
        .string({ invalid_type_error: 'Adderss must be string.' })
        .max(200, { message: "Adderss can't exceed 200 charccters." })
        .optional(),
    role: z.enum(Object.values(Role) as [string]).optional(),
    isActive: z.enum(Object.values(IsActive) as [string]).optional(),
    isDeleted: z
        .boolean({
            invalid_type_error: 'isDeleted must be true or false',
        })
        .optional(),
    isVerified: z
        .boolean({
            invalid_type_error: 'isVerified must be true or false',
        })
        .optional(),
});
