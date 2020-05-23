import * as yup from 'yup';

export default yup.object().shape({
  id: yup.number(),
  email: yup.string().ensure(),
  role: yup.string().ensure().oneOf(['CLIENT', 'DRIVER', 'ADMIN']),
  sex: yup.string().oneOf(['MALE', 'FEMALE']),
  fio: yup.string().ensure(),
  age: yup.number(),
});
