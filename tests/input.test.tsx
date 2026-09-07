import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import useInput from "../user-input/src/app/hooks/use-input";

afterEach(cleanup);
function Harness() {
  const input = useInput((value: string) => value.trim().length > 0);
  return <>
    <input aria-label="Name" value={input.value} onChange={input.valueChangeHandler} onBlur={input.inputBlurHandler} />
    <output>{input.hasError ? "Invalid" : input.valueIsValid ? "Valid" : "Untouched"}</output>
    <button onClick={input.resetInput}>Reset</button>
  </>;
}
it("validates on blur, accepts nonempty input and resets touched state", () => {
  render(<Harness />);
  const input = screen.getByRole("textbox", {name: "Name"});
  expect(screen.getByText("Untouched")).toBeTruthy();
  fireEvent.change(input, {target: {value: "   "}});
  fireEvent.blur(input);
  expect(screen.getByText("Invalid")).toBeTruthy();
  fireEvent.change(input, {target: {value: "Fatma"}});
  expect(screen.getByText("Valid")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", {name: "Reset"}));
  expect((input as HTMLInputElement).value).toBe("");
  expect(screen.getByText("Untouched")).toBeTruthy();
});
