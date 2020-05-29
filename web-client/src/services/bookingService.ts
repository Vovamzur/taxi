import { Coordinate } from "types/coodrinate.types";
import callWebApi from "helpers/webApiHelper";

export const fetchActiveDrivers = async (position: Coordinate) => {
  const response = await callWebApi({
    endpoint: ``,
    type: 'GET'
  });

  return response.json();
};

