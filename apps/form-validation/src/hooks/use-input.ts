"use client";
import { useReducer, type ChangeEvent } from "react";
import type { InputValidator, UseInputResult } from "@/shared/types";
type InputState = { value: string; isTouched: boolean };
type InputAction =
  { type: "INPUT"; value: string } | { type: "BLUR" } | { type: "RESET" };
const initialState: InputState = { value: "", isTouched: false };
function reducer(state: InputState, action: InputAction): InputState {
  switch (action.type) {
    case "INPUT":
      return { ...state, value: action.value };
    case "BLUR":
      return { ...state, isTouched: true };
    case "RESET":
      return initialState;
  }
}
export default function useInput(validate: InputValidator): UseInputResult {
  const [state, dispatch] = useReducer(reducer, initialState);
  const valueIsValid = validate(state.value);
  return {
    value: state.value,
    valueIsValid,
    hasError: state.isTouched && !valueIsValid,
    valueChangeHandler: (event: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "INPUT", value: event.target.value }),
    inputBlurHandler: () => dispatch({ type: "BLUR" }),
    resetInput: () => dispatch({ type: "RESET" }),
  };
}
