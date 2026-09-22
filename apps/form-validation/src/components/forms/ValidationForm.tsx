"use client";
import { useState, type FormEvent } from "react";
import Icon from "@/components/ui/Icon";
import useInput from "@/hooks/use-input";
const validName = (value: string) =>
  value.trim().length >= 2 && value.trim().length <= 60;
const validEmail = (value: string) =>
  value.trim().length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export default function ValidationForm() {
  const firstName = useInput(validName);
  const lastName = useInput(validName);
  const email = useInput(validEmail);
  const [success, setSuccess] = useState("");
  const fields = [
    {
      id: "firstName",
      label: "First name",
      input: firstName,
      autoComplete: "given-name",
      placeholder: "Ada",
      error: "Enter a first name between 2 and 60 characters.",
    },
    {
      id: "lastName",
      label: "Last name",
      input: lastName,
      autoComplete: "family-name",
      placeholder: "Lovelace",
      error: "Enter a last name between 2 and 60 characters.",
    },
    {
      id: "email",
      label: "Email address",
      input: email,
      autoComplete: "email",
      placeholder: "ada@example.com",
      error: "Enter a valid email address, such as ada@example.com.",
    },
  ];
  const complete = fields.filter((field) => field.input.valueIsValid).length;
  function reset() {
    fields.forEach((field) => field.input.resetInput());
    setSuccess("");
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fields.forEach((field) => field.input.inputBlurHandler());
    const invalid = fields.find((field) => !field.input.valueIsValid);
    if (invalid) {
      setSuccess("");
      document.getElementById(invalid.id)?.focus();
      return;
    }
    setSuccess(
      `All set, ${firstName.value.trim()}! Your details passed validation. This demo does not send or store your information.`,
    );
    fields.forEach((field) => field.input.resetInput());
  }
  return (
    <div className="workspace">
      <section className="panel" aria-labelledby="details-title">
        <div className="panel-heading">
          <span className="panel-kicker">LET’S START WITH YOU</span>
          <h2 id="details-title">Your details</h2>
          <p>A little introduction goes a long way. All fields are required.</p>
        </div>
        <div className="status" role="status">
          {success}
        </div>
        <form onSubmit={submit} noValidate>
          <div className="validation-fields">
            {fields.map(
              ({ id, label, input, autoComplete, placeholder, error }) => (
                <div
                  className={`field ${id === "email" ? "field-wide" : ""}`}
                  key={id}
                >
                  <label htmlFor={id}>{label}</label>
                  <input
                    id={id}
                    name={id}
                    type={id === "email" ? "email" : "text"}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    maxLength={id === "email" ? 254 : 60}
                    required
                    value={input.value}
                    onBlur={input.inputBlurHandler}
                    onChange={(event) => {
                      input.valueChangeHandler(event);
                      setSuccess("");
                    }}
                    aria-invalid={input.hasError}
                    aria-describedby={
                      input.hasError ? `${id}-error` : undefined
                    }
                  />
                  {input.hasError && (
                    <p className="error-text" id={`${id}-error`}>
                      {error}
                    </p>
                  )}
                </div>
              ),
            )}
          </div>
          <div className="form-actions">
            <button className="primary" type="submit">
              Validate details <Icon name="arrow" />
            </button>
            <button className="secondary" type="button" onClick={reset}>
              Reset form
            </button>
          </div>
        </form>
      </section>
      <aside className="panel note" aria-labelledby="guide-title">
        <span className="guide-icon">
          <Icon name="shield" />
        </span>
        <p className="panel-kicker">A LITTLE GUIDANCE</p>
        <h2 id="guide-title">Make a good first entry.</h2>
        <p className="hint">
          Clear guidance. Instant feedback. A fresh start whenever you need it.
        </p>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Valid fields"
          aria-valuenow={complete}
          aria-valuemin={0}
          aria-valuemax={3}
        >
          <div
            className="progress-fill"
            style={{ width: `${(complete / 3) * 100}%` }}
          />
        </div>
        <p className="hint">{complete} of 3 fields ready</p>
        <ul>
          <li>
            <span className="guide-check">
              <Icon name="check" />
            </span>
            <strong>Start with your name</strong>Use 2–60 characters for each
            name.
          </li>
          <li>
            <span className="guide-check">
              <Icon name="check" />
            </span>
            <strong>Add an email address</strong>Include a domain, like
            example.com.
          </li>
          <li>
            <span className="guide-check">
              <Icon name="check" />
            </span>
            <strong>Keep it private</strong>Nothing is sent to a server or
            saved.
          </li>
        </ul>
      </aside>
    </div>
  );
}
