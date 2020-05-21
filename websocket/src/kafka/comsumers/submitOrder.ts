import { OffsetFetchRequest, ConsumerOptions, Consumer } from 'kafka-node';

import { submitOrder } from './../../config/kafkaTopics';
import kafkaClient from './../client';

const topics: OffsetFetchRequest[] = [{ topic: submitOrder }];
const options: ConsumerOptions = {};
export const submitOrderConsumer = new Consumer(kafkaClient, topics, options);

submitOrderConsumer.on('error', (err: Error): void => {
  console.error(`Submit order kafka consumer error: ${err}`);
});

submitOrderConsumer.on('offsetOutOfRange', (err: any) => {
  console.error(`Submit order kafka consumer offset out of range error: ${err}`);
});
