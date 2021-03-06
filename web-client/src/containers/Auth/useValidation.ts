import { useState } from 'react';
import validator from 'validator';

import { Role, Sex } from '../../types/user.types';

const useValidation = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<Role>(Role.CLIENT);
  const [fio, setFio] = useState<string>('');
  const [sex, setSex] = useState<Sex>(Sex.MALE);
  const [age, setAge] = useState<number>(0);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordlValid] = useState<boolean>(true);
  const [isRoleValid, setIsRoleValid] = useState<boolean>(true);
  const [isFioValid, setIsFioValid] = useState<boolean>(true);
  const [isSexValid, setIsSexValid] = useState<boolean>(true);
  const [isAgeValid, setIsAgeValid] = useState<boolean>(true);

  const emailChanged = (email: string) => {
    setEmail(email);
    setIsEmailValid(true);
  };

  const passwordChanged = (password: string) => {
    setPassword(password);
    setIsPasswordlValid(true);
  };

  const roleChanged = (role: Role) => {
    setRole(role);
    setIsRoleValid(true);
  };

  const fioChanged = (fio: string) => {
    setFio(fio);
    setIsFioValid(true);
  };

  const sexChanged = (sex: Sex) => {
    setSex(sex);
    setIsSexValid(true);
  };

  const ageChanged = (age: number) => {
    setAge(age);
    setIsAgeValid(true);
  };

  const validateEmail = () => {
    const isEmailValid = validator.isEmail(email);
    setIsEmailValid(isEmailValid);
    return isEmailValid;
  };

  const validatePassword = () => {
    const isPasswordValid = validator.isByteLength(password, { min: 8, max: undefined });
    setIsPasswordlValid(isPasswordValid);
    return isPasswordValid;
  };

  const validateRole = () => {
    const isRoleValid = validator.isIn(role as string, ['CLIENT', 'DRIVER'])
    setIsRoleValid(isRoleValid);
    return isRoleValid;
  };

  const validateFio = () => {
    const isFioValid = validator.isByteLength(fio, { min: 8, max: undefined });
    setIsFioValid(isFioValid);
    return isFioValid;
  };

  const validateSex = () => {
    const isSexValid = validator.isIn(sex as string, ['MALE', 'FEMALE'])
    setIsSexValid(isSexValid);
    return isSexValid;
  };

  const validateAge = () => {
    const isAgeValid = validator.isInt(fio, { min: 18, max: undefined });
    setIsAgeValid(isAgeValid);
    return isAgeValid;
  };

  return {
    email,
    password,
    role,
    fio,
    sex,
    age,
    isEmailValid,
    isPasswordValid,
    isRoleValid,
    isFioValid,
    isSexValid,
    isAgeValid,
    emailChanged,
    passwordChanged,
    roleChanged,
    fioChanged,
    sexChanged,
    ageChanged,
    validateEmail,
    validatePassword,
    validateRole,
    validateFio,
    validateSex,
    validateAge,
  };
};

export default useValidation;
