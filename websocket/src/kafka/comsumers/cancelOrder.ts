import { OffsetFetchRequest, ConsumerOptions, Consumer } from 'kafka-node';

import { cancelOrder } from './../../config/kafkaTopics';
import kafkaClient from './../client';

const topics: OffsetFetchRequest[] = [{ topic: cancelOrder }];
const options: ConsumerOptions = {};
export const cancelOrderConsumer = new Consumer(kafkaClient, topics, options);

cancelOrderConsumer.on('error', (err: Error): void => {
  console.error(`Cancel order kafka consumer error: ${err}`);
});

cancelOrderConsumer.on('offsetOutOfRange', (err: any) => {
  console.error(`Cancel order kafka consumer offset out of range error: ${err}`);
});
