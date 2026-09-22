import type { User } from "./types";
export const STORAGE_KEY = "form-studio.users.v1";
export function validateUser(
  username: string,
  age: string,
): { username?: string; age?: string } {
  const errors: { username?: string; age?: string } = {};
  if (username.trim().length < 2 || username.trim().length > 60)
    errors.username = "Enter a name between 2 and 60 characters.";
  if (!/^\d+$/.test(age) || Number(age) < 12 || Number(age) > 120)
    errors.age = "Enter a whole number between 12 and 120.";
  return errors;
}
export function parseUsers(raw: string | null): User[] {
  if (!raw) return [];
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value) || value.length > 1000)
    throw new Error("Invalid saved directory");
  const ids = new Set<string>();
  const names = new Set<string>();
  return value.map((item: unknown) => {
    if (!item || typeof item !== "object")
      throw new Error("Invalid saved person");
    const user = item as Record<string, unknown>;
    if (
      typeof user.id !== "string" ||
      !user.id ||
      typeof user.username !== "string" ||
      typeof user.age !== "number" ||
      !Number.isInteger(user.age) ||
      Object.keys(validateUser(user.username, String(user.age))).length ||
      ids.has(user.id) ||
      names.has(user.username.trim().toLowerCase())
    )
      throw new Error("Invalid saved person");
    ids.add(user.id);
    names.add(user.username.trim().toLowerCase());
    return { id: user.id, username: user.username.trim(), age: user.age };
  });
}
