"use client";
import { useState, type FormEvent } from "react";
import type { AddUserFormProps } from "@/shared/types";
import Icon from "@/components/ui/Icon";
import { validateUser } from "@/shared/users";
export default function AddUserForm({
  onAddUser,
  editingUser,
  onCancel,
}: AddUserFormProps) {
  const [username, setUsername] = useState(editingUser?.username ?? "");
  const [age, setAge] = useState(editingUser ? String(editingUser.age) : "");
  const [errors, setErrors] = useState<{ username?: string; age?: string }>({});
  const [formError, setFormError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateUser(username, age);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length) {
      document
        .getElementById(nextErrors.username ? "username" : "age")
        ?.focus();
      return;
    }
    const error = onAddUser(username.trim(), Number(age));
    if (error) {
      setFormError(error);
      document.getElementById("username")?.focus();
      return;
    }
    setUsername("");
    setAge("");
    setErrors({});
  }
  return (
    <section className="panel" aria-labelledby="form-title">
      <div className="panel-heading">
        <span className="form-icon">
          <Icon name={editingUser ? "edit" : "person"} />
        </span>
        <span className="panel-kicker">
          {editingUser ? "A QUICK UPDATE" : "GROW YOUR CIRCLE"}
        </span>
        <h2 id="form-title">
          {editingUser ? "Edit person" : "Add someone new"}
        </h2>
        <p>
          {editingUser
            ? "Update their details below."
            : "Great directories start with one person."}{" "}
          All fields are required.
        </p>
      </div>
      <form onSubmit={submit} noValidate>
        {formError && (
          <p id="form-error" className="error-text" role="alert">
            {formError}
          </p>
        )}
        <div className="field">
          <label htmlFor="username">Name</label>
          <input
            id="username"
            name="username"
            autoComplete="name"
            placeholder="e.g. Ada Lovelace"
            required
            maxLength={60}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setFormError("");
              setErrors((previous) => ({ ...previous, username: undefined }));
            }}
            aria-invalid={Boolean(errors.username || formError)}
            aria-describedby={
              errors.username
                ? "username-error"
                : formError
                  ? "form-error"
                  : undefined
            }
          />
          {errors.username && (
            <p className="error-text" id="username-error">
              {errors.username}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 28"
            required
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setErrors((previous) => ({ ...previous, age: undefined }));
            }}
            aria-invalid={Boolean(errors.age)}
            aria-describedby={errors.age ? "age-error" : "age-hint"}
          />
          {errors.age ? (
            <p className="error-text" id="age-error">
              {errors.age}
            </p>
          ) : (
            <p className="hint" id="age-hint">
              A whole number between 12 and 120.
            </p>
          )}
        </div>
        <div className="form-actions">
          <button className="primary" type="submit">
            {editingUser ? "Save changes" : "Add person"}
            <Icon name={editingUser ? "check" : "arrow"} />
          </button>
          {editingUser && (
            <button className="secondary" type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <p className="privacy-note">
        <Icon name="shield" />
        Saved only in this browser. Use sample details when trying the demo.
      </p>
    </section>
  );
}
