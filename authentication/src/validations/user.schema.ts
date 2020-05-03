import * as yup from 'yup';

export default yup.object().shape({
  id: yup.number(),
  role: yup.string().ensure().oneOf(['CLIENT', 'DRIVER', 'ADMIN']),
  username: yup.string().ensure(),
  fio: yup.string(),
  sex: yup.mixed().oneOf(['MALE', 'FEMALE']),
  age: yup.number(),
});
