import * as yup from 'yup';

export default yup.object().shape({
  username: yup.string().ensure(),
  password: yup.string().ensure(),
});
