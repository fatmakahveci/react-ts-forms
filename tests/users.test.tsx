import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import AddUser from "../user-list-forms/src/app/components/Users/AddUser";

beforeEach(() => {
  for (const id of ["backdrop-root", "overlay-root"]) {
    const node = document.createElement("div"); node.id = id; document.body.append(node);
  }
});
afterEach(() => { cleanup(); document.getElementById("backdrop-root")?.remove(); document.getElementById("overlay-root")?.remove(); });
it("rejects empty fields and ages below twelve, then accepts the boundary age", () => {
  const onAddUser = vi.fn();
  render(<AddUser onAddUser={onAddUser} />);
  const submit = () => fireEvent.click(screen.getByRole("button", {name: "Add User"}));
  submit();
  expect(screen.getByText("Invalid input")).toBeTruthy();
  expect(onAddUser).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", {name: "Okay"}));
  fireEvent.change(screen.getByLabelText("Username"), {target: {value: "Fatma"}});
  fireEvent.change(screen.getByLabelText("Age (Years)"), {target: {value: "11"}});
  submit();
  expect(screen.getByText("Invalid age")).toBeTruthy();
  expect(onAddUser).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", {name: "Okay"}));
  fireEvent.change(screen.getByLabelText("Age (Years)"), {target: {value: "12"}});
  submit();
  expect(onAddUser).toHaveBeenCalledExactlyOnceWith("Fatma", 12);
  expect((screen.getByLabelText("Username") as HTMLInputElement).value).toBe("");
});
