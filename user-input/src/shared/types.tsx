"use client";

import { ChangeEvent } from "react";

export type useInputProp = (value: string) => boolean;

export type useInputReturnTypes = {
  value: string;
  valueIsValid: boolean;
  hasError: boolean;
  valueChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: () => void;
  resetInput: () => void;
};
