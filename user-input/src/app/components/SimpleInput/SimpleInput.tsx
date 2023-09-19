"use client";

import useInput from "@/app/hooks/use-input";
import { FormEvent } from "react";

const isNotEmpty = (value: string): boolean => value.trim() !== "";
const isEmail = (value: string): boolean => value.includes("@");

const SimpleInput = (): JSX.Element => {
  const {
    value: firstName,
    valueIsValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    resetInput: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const {
    value: lastName,
    valueIsValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    resetInput: resetLastNameInput,
  } = useInput(isNotEmpty);

  const {
    value: email,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: resetEmailInput,
  } = useInput(isEmail);

  let formIsValid: boolean = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!firstNameIsValid || !lastNameIsValid || !emailIsValid) {
      return;
    }

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div
        className={firstNameHasError ? "form-control invalid" : "form-control"}
      >
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          onBlur={firstNameBlurHandler}
          onChange={firstNameChangedHandler}
          type="text"
          value={firstName || ""}
        />
        {firstNameHasError && (
          <p className="error-text">Please enter a valid first name.</p>
        )}
      </div>
      <div
        className={lastNameHasError ? "form-control invalid" : "form-control"}
      >
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          onBlur={lastNameBlurHandler}
          onChange={lastNameChangedHandler}
          type="text"
          value={lastName || ""}
        />
        {lastNameHasError && (
          <p className="error-text">Please enter a valid last name.</p>
        )}
      </div>
      <div className={emailHasError ? "form-control invalid" : "form-control"}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          onBlur={emailBlurHandler}
          onChange={emailChangedHandler}
          type="email"
          value={email || ""}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid e-mail.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
