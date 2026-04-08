import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
    PORT,
    NODE_ENV,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    JWT_SECRET_KEY,
    REFRESH_SECRET_KEY,
    PAYSTACK_TEST_SECRET_KEY,
    PAYSTACK_SECRET_KEY,
    PAYSTACK_TEST_PUBLIC_KEY,
    JWT_EXPIRES_IN,
} = process.env;