import mongoose from 'mongoose';
import { DB_NAME, DB_PORT, DB_URL } from '../globals/constants';
import logger from "./logger";
/**
 * @description Connect to MongoDB Database
 * @returns {Promise<void>} - Promise object of void
 */
export default async function connectDB(): Promise<void> {
    const connect = async () => {
        try {
            const DbUrl = `${DB_URL}`;
            const conn = await mongoose.connect(DbUrl);
            const message = `MongoDB Connected ..............`;
            logger.info('Database .. ' + message);
        } catch (error: any) {
            logger.error('Database', error.message);
            return process.exit(1);
        }
    };

    await connect();

    mongoose.connection.on('disconnected', connect);
}
