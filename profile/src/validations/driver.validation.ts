import * as yup from 'yup';
import carSchema from './car.validation'

export default yup.object().shape({
  // userID: yup.number().required(),
  carId: yup.string().required(),
  numberOfTrips: yup.number().required(),
});
