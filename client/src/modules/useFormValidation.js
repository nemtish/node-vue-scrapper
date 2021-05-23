import { reactive } from "@vue/reactivity";

const isEmpty = (fieldName, fieldValue) => {
  return !fieldValue ? "The " + fieldName + " field is required" : "";
};

const minLength = (fieldName, fieldValue, min) => {
  return fieldValue.length < min
    ? `The ${fieldName} field must be atleast ${min} characters long`
    : "";
};

const isEmail = (fieldName, fieldValue) => {
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(fieldValue)
    ? "The input is not a valid " + fieldName + " address"
    : "";
};

const errors = reactive({});

export default function useFormValidation() {
  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isEmail(fieldName, fieldValue);
  };
  const validatePasswordField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 2);
  };
  return { errors, validateEmailField, validatePasswordField };
}
