import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ValidationForm from "../apps/form-validation/src/components/forms/ValidationForm";
afterEach(cleanup);
it("focuses the first invalid field and rejects incomplete email domains", () => {
  render(<ValidationForm />);
  const submit = () =>
    fireEvent.click(screen.getByRole("button", { name: /Validate details/ }));
  submit();
  expect(document.activeElement).toBe(screen.getByLabelText("First name"));
  fireEvent.change(screen.getByLabelText("First name"), {
    target: { value: "Ada" },
  });
  fireEvent.change(screen.getByLabelText("Last name"), {
    target: { value: "Lovelace" },
  });
  const email = screen.getByLabelText("Email address");
  for (const value of [
    "ada@",
    "ada@example",
    "a b@example.com",
    "a@@example.com",
  ]) {
    fireEvent.change(email, { target: { value } });
    submit();
    expect(email.getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByRole("status").textContent).toBe("");
  }
  fireEvent.change(email, { target: { value: "ada@example.com" } });
  submit();
  expect(screen.getByRole("status").textContent).toContain("All set, Ada!");
  expect((email as HTMLInputElement).value).toBe("");
  expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe(
    "0",
  );
});
it("clears errors and values with Reset form", () => {
  render(<ValidationForm />);
  fireEvent.click(screen.getByRole("button", { name: /Validate details/ }));
  fireEvent.click(screen.getByRole("button", { name: "Reset form" }));
  expect(screen.getByLabelText("First name").getAttribute("aria-invalid")).toBe(
    "false",
  );
});
