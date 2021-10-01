import { useState } from "react";

export interface IUseForm {
  confirmPassword?: string;
  password?: string;
}

const useForm = <T extends IUseForm>(
  requiredArr = [] as string[],
  defaultValue = {} as T
) => {
  const [inputData, setInputData] = useState(defaultValue);

  const [error, setError] = useState({} as T);

  const handleInput = (value: string, name: string) => {
    const handleError = (isError: boolean, provider?: string) =>
      setError((preError) => ({ ...preError, [provider || name]: isError }));
    const required = requiredArr.indexOf(name) !== -1;
    if (required && name.toLowerCase().includes("email")) {
      const isValid = /\S+@\S+\.\S+/.test(value);
      if (isValid) {
        handleError(false);
      } else {
        handleError(true);
      }
    } else if (required && name === "name") {
      const length = value.trim().length >= 6;
      const isValid = /^([^0-9]*)$/.test(value);
      if (isValid && length) {
        handleError(false);
      } else {
        handleError(true);
      }
    } else if (required && name === "password") {
      const isValid = value.trim().length >= 6;
      if (inputData.confirmPassword) {
        const match = value === inputData.confirmPassword;
        if (match) {
          handleError(false, "confirmPassword");
        } else {
          handleError(true, "confirmPassword");
        }
      }
      if (isValid) {
        handleError(false);
      } else {
        handleError(true);
      }
    } else if (required && name === "confirmPassword") {
      const isValid = value.trim().length >= 6;
      const match = inputData.password === value;
      if (isValid && match) {
        handleError(false);
      } else {
        handleError(true);
      }
    } else if (required && value.trim().length < 1) {
      handleError(true);
    } else {
      handleError(false);
    }
    setInputData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (submit: (data: T) => void) => {
    const filtered = requiredArr.filter((required) => {
      const empty = !inputData[required as "password"];
      if (empty) {
        setError((preError) => ({ ...preError, [required]: true }));
      }
      return empty;
    });

    if (!filtered.length) {
      submit(inputData);
      setInputData(defaultValue);
    }
  };

  return {
    handleInput,
    handleSubmit,
    error,
    inputData,
  };
};

export default useForm;
