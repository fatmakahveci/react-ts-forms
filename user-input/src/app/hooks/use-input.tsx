"use client";

import { useInputProp, useInputReturnTypes } from "@/shared/types";
import { ChangeEvent, useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (
  state: Record<string, boolean>,
  action: Record<string, any>
) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return state;
};

const useInput = (validateValue: useInputProp): useInputReturnTypes => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid: boolean = validateValue(inputState.value);
  const hasError: boolean = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: "INPUT", value: e.target.value });
  };

  const inputBlurHandler = (): void => {
    dispatch({ type: "BLUR" });
  };

  const resetInput = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};
export default useInput;
