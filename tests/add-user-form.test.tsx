import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import AddUserForm from "../apps/user-management/src/components/users/AddUserForm";
afterEach(cleanup);
it("shows accessible errors, rejects fractional/out-of-range ages, and trims names", () => {
  const onAddUser = vi.fn();
  render(<AddUserForm onAddUser={onAddUser} />);
  const submit = () =>
    fireEvent.click(screen.getByRole("button", { name: "Add person" }));
  submit();
  const name = screen.getByLabelText("Name");
  const age = screen.getByLabelText("Age");
  expect(name.getAttribute("aria-invalid")).toBe("true");
  expect(document.activeElement).toBe(name);
  fireEvent.change(name, { target: { value: "  Ada  " } });
  for (const value of ["11", "121", "12.5", "NaN", "1e2", "-5"]) {
    fireEvent.change(age, { target: { value } });
    submit();
    expect(onAddUser).not.toHaveBeenCalled();
    expect(age.getAttribute("aria-invalid")).toBe("true");
  }
  fireEvent.change(age, { target: { value: "12" } });
  submit();
  expect(onAddUser).toHaveBeenCalledExactlyOnceWith("Ada", 12);
  expect((name as HTMLInputElement).value).toBe("");
});
it("keeps entered values when a duplicate is rejected", () => {
  render(<AddUserForm onAddUser={() => "Already exists"} />);
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada" } });
  fireEvent.change(screen.getByLabelText("Age"), { target: { value: "28" } });
  fireEvent.click(screen.getByRole("button", { name: "Add person" }));
  expect(screen.getByRole("alert").textContent).toBe("Already exists");
  expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("Ada");
});
