import callWebApi from 'helpers/webApiHelper';
import { OrderProps} from 'types/order.types';

export const bookTrip = async (props: OrderProps) => {
  const response = await callWebApi({
    endpoint: `/api/order/new-order`,
    type: 'POST',
    request: props,
  });

  return response.json();
};

export const acceptOrder = async (props: any) => {
  const response = await callWebApi({
    endpoint: `/api/order/accept-order`,
    type: 'POST',
    request: props,
  });

  return response.json();
};
