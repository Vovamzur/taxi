import * as yup from 'yup';

export default yup.object().shape({
  id: yup.number(),
  username: yup.string().ensure(),
  role: yup.string().ensure().oneOf(['CLIENT', 'DRIVER', 'ADMIN']),
  sex: yup.string().oneOf(['MALE', 'FEMALE']),
  fio: yup.string(),
  age: yup.number(),
});
