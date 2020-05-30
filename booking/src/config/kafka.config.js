import dotenv from 'dotenv';

dotenv.config();

export const kafkaHost = process.env.KAFKA_URL;
