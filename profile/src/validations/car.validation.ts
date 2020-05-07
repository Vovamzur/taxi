import * as yup from 'yup';

export default yup.object().shape({
  brand: yup.string().ensure(),
  number: yup.string().ensure(),
  color: yup.string().ensure(),
  year: yup.date(),
  driverId: yup.string().ensure(),
});
