import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const geoLocationUrl = process.env.GEO_LOCATION_URL;
const geoLocationApi = axios.create({
  baseURL: geoLocationUrl
});

export const newOrder = async ({ userId, from, to }) => {
  try {
    const { data } = await geoLocationApi.post(`/nearestDrivers/${userId}`, {
      longitude: from.longitude,
      latitude: from.latitude
    });
    console.log(data)
  } catch(err) {
    return { success: false }
  }


  return { success: true };
};
