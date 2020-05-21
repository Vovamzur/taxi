import { OffsetFetchRequest, ConsumerOptions, Consumer } from 'kafka-node';

import { createOrder } from './../../config/kafkaTopics';
import kafkaClient from './../client';

const topics: OffsetFetchRequest[] = [{ topic: createOrder }];
const options: ConsumerOptions = {};
export const createOrderConsumer = new Consumer(kafkaClient, topics, options);

createOrderConsumer.on('error', (err: Error): void => {
  console.error(`Create order kafka consumer error: ${err}`);
});

createOrderConsumer.on('offsetOutOfRange', (err: any) => {
  console.error(`Create order kafka consumer offset out of range error: ${err}`);
});
