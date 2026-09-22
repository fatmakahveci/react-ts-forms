import type { ChangeEvent } from "react";
export type InputValidator = (value: string) => boolean;
export type UseInputResult = {
  value: string;
  valueIsValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: () => void;
  resetInput: () => void;
};
