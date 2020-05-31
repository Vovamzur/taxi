import dotenv from 'dotenv';
import axios from 'axios';
import kafka from 'kafka-node';

import * as kafkaConfig from './../../config/kafka.config';
import knexConnection from '../../data/db/knexConnection';

dotenv.config();

const geoLocationUrl = process.env.GEO_LOCATION_URL;
const geoLocationApi = axios.create({
  baseURL: geoLocationUrl
});
// const kafkaClient = new kafka.KafkaClient(kafkaConfig);
// const producer = new kafka.Producer(kafkaClient);
// const topics = {
//   createOrder: 'create.order',
//   submitOrder: 'submit.order',
//   cancelOrder: 'cancel.order',
// }

export const newOrder = async ({ userId, from, to, clientSocketId }, io) => {
  try {
    const { data } = await geoLocationApi.post(`/nearestDrivers/${userId}`, {
      longitude: from.longitude,
      latitude: from.latitude
    });

    const [fromId] = await knexConnection('coordinates').returning('id').insert({
      longitude: from.longitude,
      latitude: from.latitude,
      isDriver: false,
      isActive: true,
      socketId: clientSocketId,
      userId
    });

    const [toId] = await knexConnection('coordinates').returning('id').insert({
      longitude: to.longitude,
      latitude: to.latitude,
      isDriver: false,
      isActive: true,
      socketId: clientSocketId,
      userId
    });

    const [newOrderId] = await knexConnection('orders').returning('id').insert({
      clientSocketId,
      driverSocketId: null,
      status: 'pending',
      date: new Date(),
      from: fromId,
      to: toId,
    });

    const user = await knexConnection('users').where('id', '=', userId).first();

    data.forEach(driver => {
      io.emit(`${driver.socketId}new-order`, { from, to, userFio: user.fio, newOrderId });
    })
    return { success: true, newOrderId };
  } catch(err) {
    console.log(err)
    return { success: false, newOrderId: null };
  }
};
