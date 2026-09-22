import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Home from "../apps/user-management/src/app/page";
import {
  parseUsers,
  STORAGE_KEY,
} from "../apps/user-management/src/shared/users";
beforeEach(() => localStorage.clear());
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
async function open() {
  render(<Home />);
  await screen.findByRole("button", { name: "Add person" });
}
function add(name: string, age = "28") {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: name } });
  fireEvent.change(screen.getByLabelText("Age", { exact: true }), {
    target: { value: age },
  });
  fireEvent.click(screen.getByRole("button", { name: "Add person" }));
}
it("persists, edits, searches, sorts, deletes and restores people", async () => {
  await open();
  add("Grace", "35");
  add("Ada", "28");
  expect(parseUsers(localStorage.getItem(STORAGE_KEY))).toHaveLength(2);
  fireEvent.change(screen.getByLabelText("Sort by"), {
    target: { value: "name" },
  });
  expect(screen.getAllByRole("listitem")[0].textContent).toContain("Ada");
  fireEvent.change(screen.getByLabelText("Search people"), {
    target: { value: "grace" },
  });
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  fireEvent.change(screen.getByLabelText("Search people"), {
    target: { value: "" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Edit Ada" }));
  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Ada Lovelace" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
  expect(
    screen.getByRole("button", { name: "Edit Ada Lovelace" }),
  ).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Delete Ada Lovelace" }));
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  fireEvent.click(screen.getByRole("button", { name: "Undo delete" }));
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  cleanup();
  await open();
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});
it("rejects names that differ only by case or surrounding spaces", async () => {
  await open();
  add("Ada");
  add(" ada ");
  expect(screen.getByRole("alert").textContent).toContain(
    "already in your directory",
  );
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
});
it("preserves corrupted storage and still allows an in-memory session", async () => {
  localStorage.setItem(STORAGE_KEY, "broken");
  await open();
  expect(screen.getByRole("alert").textContent).toContain(
    "could not be loaded",
  );
  add("Ada");
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  expect(localStorage.getItem(STORAGE_KEY)).toBe("broken");
});
it("reports storage failures without losing the in-memory directory", async () => {
  await open();
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("quota");
  });
  add("Ada");
  await waitFor(() =>
    expect(screen.getByRole("alert").textContent).toContain(
      "unavailable or full",
    ),
  );
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
});
it("rejects invalid saved records and duplicate identities", () => {
  for (const value of [
    {},
    [null],
    [{ id: "1", username: "Ada", age: 12.5 }],
    [
      { id: "1", username: "Ada", age: 28 },
      { id: "1", username: "Grace", age: 35 },
    ],
  ]) {
    expect(() => parseUsers(JSON.stringify(value))).toThrow();
  }
});
