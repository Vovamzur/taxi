import { useState } from 'react';
import validator from 'validator';

type Props = {
  brand: string;
  number: string;
  year: 2020;
};

export const useValidation = (initState: Props = { brand: '', number: '', year: 2020 }) => {
  const [brand, setBrand] = useState<string>(initState.brand);
  const [number, setNumber] = useState<string>(initState.number);
  const [year, setYear] = useState<number>(initState.year);
  const [isBrandValid, setIsBrandValid] = useState<boolean>(true);
  const [isNumberValid, setIsNumberValid] = useState<boolean>(true);
  const [isYearValid, setIsYearValid] = useState<boolean>(true);

  const brandChanged = (brand: string) => {
    setBrand(brand);
    setIsBrandValid(true);
  };

  const numberChanged = (number: string) => {
    setNumber(number);
    setIsNumberValid(true);
  };

  const yearChanged = (year: number) => {
    setYear(year);
    setIsYearValid(true);
  };

  const validateBrand = () => {
    const isBrandValid = validator.isByteLength(brand, { min: 3, max: undefined });
    setIsBrandValid(isBrandValid);
    return isBrandValid
  };

  const validateNumber = () => {
    const isNumberValid = validator.isByteLength(number, { min: 4, max: undefined });
    setIsNumberValid(isNumberValid);
    return isNumberValid;
  };

  const validateYear = () => {
    const isYearValid = validator.isInt(String(year), { min: 1900, max: 2020 });
    setIsYearValid(isYearValid);
    return isYearValid;
  }

  return {
    brand,
    number,
    year,
    isBrandValid,
    isNumberValid,
    isYearValid,
    brandChanged,
    numberChanged,
    yearChanged,
    validateBrand,
    validateNumber,
    validateYear
  }
};
