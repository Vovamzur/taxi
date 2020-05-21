import dotenv from 'dotenv';

dotenv.config();

export const kafkaHost: string = process.env.KAFKA_URL;
