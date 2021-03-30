import { useEffect, useState } from 'react';

import { Button } from '../Button/Button.js';

import './Form.css';

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [nameSymbols, setNameSymbols] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState(false);
  const [length, setLength] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case 'nameSymbols':
          const regName = /^[a-zA-Z]+$/;
          regName.test(value) ? setNameSymbols(false) : setNameSymbols(true);
          break;
        case 'phoneNumbers':
          const regPhone = /^[0-9]+$/;
          regPhone.test(value) ? setPhoneNumbers(false) : setPhoneNumbers(true);
          break;
        case 'length':
          value.length === validations[validation]
            ? setLength(false)
            : setLength(true);
          break;
        default:
          return;
      }
    }
  }, [value, validations]);

  return {
    isEmpty,
    nameSymbols,
    phoneNumbers,
    length,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = (event) => {
    setIsDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    setIsDirty,
    setValue,
    ...valid,
  };
};

export const Form = ({ category, name, price }) => {
  const userName = useInput('', {
    isEmpty: true,
    nameSymbols: true,
  });
  const userPhone = useInput('', {
    isEmpty: true,
    phoneNumbers: true,
    length: 12,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      !userName.isEmpty &&
      !userName.nameSymbols &&
      !userPhone.isEmpty &&
      !userPhone.phoneNumbers &&
      !userPhone.length
    ) {
      console.dir({
        Name: userName.value,
        Phone: userPhone.value,
        name,
        category,
        price,
      });
      userName.setValue('');
      userPhone.setValue('');
      userName.setIsDirty(false);
      userPhone.setIsDirty(false);
    } else {
      userName.setIsDirty(true);
      userPhone.setIsDirty(true);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <p className="input-control">
        <input
          className={
            (userName.isEmpty && userName.isDirty) ||
            (userName.isDirty && userName.nameSymbols)
              ? 'input-error'
              : null
          }
          value={userName.value}
          onChange={(event) => userName.onChange(event)}
          onBlur={(event) => userName.onBlur(event)}
          type="text"
          placeholder="Name"
        />
        <span className="error">
          {userName.isEmpty && userName.isDirty
            ? 'This field in required! '
            : null}
          {userName.nameSymbols && userName.isDirty
            ? 'Only letters allowed! '
            : null}
        </span>
      </p>
      <p className="input-control">
        <input
          className={
            (userPhone.isEmpty && userPhone.isDirty) ||
            (userPhone.isDirty && userPhone.phoneNumbers) ||
            (userPhone.length && userPhone.isDirty)
              ? 'input-error'
              : null
          }
          value={userPhone.value}
          onChange={(event) => userPhone.onChange(event)}
          onBlur={(event) => userPhone.onBlur(event)}
          type="text"
          placeholder="Number"
        />
        <span className="error">
          {userPhone.isEmpty && userPhone.isDirty
            ? 'This field in required! '
            : null}
          {userPhone.phoneNumbers && userPhone.isDirty
            ? 'Only numbers allowed! '
            : null}
          {userPhone.length && userPhone.isDirty
            ? 'Should contain 12 characters! '
            : null}
        </span>
      </p>
      <div className="btn-order">
        <Button contained title="Order" />
      </div>
    </form>
  );
};
