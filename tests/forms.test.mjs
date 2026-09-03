import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the input hook handles change, blur, validation, and reset", async () => {
  const hook = await source("user-input/src/app/hooks/use-input.tsx");

  assert.match(hook, /action\.type === "INPUT"/);
  assert.match(hook, /action\.type === "BLUR"/);
  assert.match(hook, /action\.type === "RESET"/);
  assert.match(hook, /validateValue\(inputState\.value\)/);
});

test("the user form rejects empty and under-age submissions", async () => {
  const form = await source("user-list-forms/src/app/components/Users/AddUser.tsx");

  assert.match(form, /username\.trim\(\)\.length === 0/);
  assert.match(form, /\+user\.age < 12/);
  assert.match(form, /onAddUser\(user\.username, user\.age\)/);
});
