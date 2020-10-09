import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext({});

const FormContainer = ({ children, initialValues = {}, onSubmit }) => {
  const [values, setValues] = useState(initialValues);

  // const onFieldChange = (value, name) => {
  //   const valueToUpdate = values.filter((fieldValue) => {
  //     fieldValue.name === name;
  //   });

  //   valueToUpdate.value = value;

  //   setValues({
  //     ...values,
  //     valueToUpdate,
  //   });
  // };

  const resetValues = () => {
    setValues({});
  };

  // const onSubmitHandler = () => {
  //   setValues({});
  //   onSubmit(values);
  // };

  const setFields = (newValues) => {
    console.log('form context new Values: ', newValues);
    setValues(newValues);
  };

  return (
    <FormContext.Provider
      value={{
        values,
        // onFieldChange,
        resetValues,
        setFields,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

const useForm = () => {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error('useFormState must be used within FormContainer');
  }

  console.log('what is this context: ', context);

  return {
    ...context,
  };
};

export { FormContainer, useForm };
