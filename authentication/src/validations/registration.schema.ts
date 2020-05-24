import * as yup from 'yup';

export default yup.object().shape({
  email: yup.string().email(),
  password: yup.string().ensure(),
  role: yup.string().ensure().oneOf(['CLIENT', 'DRIVER', 'ADMIN']),
  sex: yup.string().oneOf(['MALE', 'FEMALE']),
  fio: yup.string().ensure(),
  age: yup.number(),
});
