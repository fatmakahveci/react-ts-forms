"use client";
import Icon from "@form-studio/ui/icon";
import { useRef, useState, useSyncExternalStore } from "react";
import AddUserForm from "@/components/users/AddUserForm";
import UserList from "@/components/users/UserList";
import type { User } from "@/shared/types";
import { parseUsers, STORAGE_KEY } from "@/shared/users";
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
export default function Home() {
  const hydrated = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  return hydrated ? (
    <Directory />
  ) : (
    <div className="shell">
      <p role="status">Loading your directory…</p>
    </div>
  );
}
function Directory() {
  const [initial] = useState(() => {
    try {
      return {
        users: parseUsers(localStorage.getItem(STORAGE_KEY)),
        warning: "",
      };
    } catch {
      return {
        users: [] as User[],
        warning:
          "Saved data could not be loaded. Changes will stay in memory for this visit; existing saved data will not be overwritten.",
      };
    }
  });
  const [users, setUsers] = useState<User[]>(initial.users);
  const [warning, setWarning] = useState(initial.warning);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState<User>();
  const [deleted, setDeleted] = useState<{ user: User; index: number }>();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const canPersist = useRef(!initial.warning);
  function update(next: User[]) {
    setUsers(next);
    if (canPersist.current) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setWarning("");
      } catch {
        setWarning(
          "Browser storage is unavailable or full. Your changes work for this visit but may not survive a reload.",
        );
      }
    }
  }
  function save(username: string, age: number): string | undefined {
    if (
      users.some(
        (user) =>
          user.id !== editing?.id &&
          user.username.toLowerCase() === username.toLowerCase(),
      )
    )
      return "This name is already in your directory.";
    if (!editing && users.length >= 1000)
      return "The directory is full. Remove someone before adding another person.";
    const person = { id: editing?.id ?? crypto.randomUUID(), username, age };
    update(
      editing
        ? users.map((user) => (user.id === editing.id ? person : user))
        : [...users, person],
    );
    setMessage(`${username} ${editing ? "updated" : "added"}.`);
    setEditing(undefined);
    setDeleted(undefined);
    requestAnimationFrame(() => document.getElementById("username")?.focus());
    return undefined;
  }
  function remove(user: User) {
    setDeleted({ user, index: users.findIndex((item) => item.id === user.id) });
    update(users.filter((item) => item.id !== user.id));
    if (editing?.id === user.id) setEditing(undefined);
    setMessage(`${user.username} removed.`);
    requestAnimationFrame(() =>
      document.getElementById("undo-delete")?.focus(),
    );
  }
  function undo() {
    if (!deleted) return;
    const next = [...users];
    next.splice(deleted.index, 0, deleted.user);
    update(next);
    setMessage(`${deleted.user.username} restored.`);
    requestAnimationFrame(() =>
      document.getElementById(`edit-${deleted.user.id}`)?.focus(),
    );
    setDeleted(undefined);
  }
  const visible = users.filter((user) =>
    user.username.toLowerCase().includes(query.trim().toLowerCase()),
  );
  if (sort === "name")
    visible.sort((a, b) => a.username.localeCompare(b.username));
  else if (sort === "age") visible.sort((a, b) => a.age - b.age);
  else visible.reverse();
  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            f.
          </span>
          Form Studio
        </div>
        <span className="workspace-label">
          <span className="workspace-dot" />
          Your personal workspace
        </span>
      </header>
      <main id="main">
        <div className="breadcrumb">
          <span>Workspace</span>
          <span aria-hidden="true">/</span>
          <strong>People directory</strong>
        </div>
        <div className="hero">
          <div>
            <p className="eyebrow">02 / People directory</p>
            <h1>
              Your people.
              <br />
              <em>A little closer.</em>
            </h1>
            <p className="subtitle">
              Keep a small directory, make a quick update, find a familiar name.
              Simple by intention.
            </p>
          </div>
          <span className="pill">
            <Icon name="shield" />
            On-device storage
          </span>
        </div>
        <section className="metrics" aria-label="Directory overview">
          <div className="metric">
            <span className="metric-icon">
              <Icon name="people" />
            </span>
            <div>
              <span className="metric-label">Total people</span>
              <strong>{users.length.toString().padStart(2, "0")}</strong>
            </div>
            <span className="metric-caption">In your directory</span>
          </div>
          <div className="metric">
            <span className="metric-icon amber">
              <Icon name="clock" />
            </span>
            <div>
              <span className="metric-label">Average age</span>
              <strong>
                {users.length
                  ? Math.round(
                      users.reduce((sum, user) => sum + user.age, 0) /
                        users.length,
                    )
                  : "—"}
                <small> years</small>
              </strong>
            </div>
          </div>
          <div className="metric privacy-metric">
            <span className="metric-icon">
              <Icon name="shield" />
            </span>
            <div>
              <span className="metric-label">Your data stays here</span>
              <p>
                Stored in this browser.
                <br />
                No account needed.
              </p>
            </div>
          </div>
        </section>
        {warning && (
          <p className="status warning" role="alert">
            {warning}
          </p>
        )}
        <div className="status" role="status">
          {message}
          {deleted && (
            <button id="undo-delete" className="text-button" onClick={undo}>
              Undo delete
            </button>
          )}
        </div>
        <div className="workspace users">
          <AddUserForm
            key={editing?.id ?? "new"}
            editingUser={editing}
            onAddUser={save}
            onCancel={() => {
              setEditing(undefined);
              requestAnimationFrame(() =>
                document.getElementById("username")?.focus(),
              );
            }}
          />
          <section className="panel" aria-labelledby="directory-title">
            <h2 id="directory-title">
              Your directory <span className="count-badge">{users.length}</span>
            </h2>
            <p className="hint">Everyone in one neat little place.</p>
            <div className="toolbar">
              <div>
                <label htmlFor="search">Search people</label>
                <input
                  id="search"
                  type="search"
                  placeholder="Find a name…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="sort">Sort by</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">Newest first</option>
                  <option value="name">Name A–Z</option>
                  <option value="age">Age ascending</option>
                </select>
              </div>
            </div>
            <p className="hint" role="status">
              {visible.length} {visible.length === 1 ? "person" : "people"}{" "}
              shown
            </p>
            {visible.length ? (
              <UserList
                users={visible}
                onEdit={(user) => {
                  setEditing(user);
                  setMessage("");
                  requestAnimationFrame(() =>
                    document.getElementById("username")?.focus(),
                  );
                }}
                onDelete={remove}
              />
            ) : (
              <div className="empty">
                <div className="empty-symbol" aria-hidden="true">
                  ◎
                </div>
                <h3>
                  {users.length
                    ? "No matching names"
                    : "Your first person belongs here"}
                </h3>
                <p>
                  {users.length
                    ? "Try another name or clear your search."
                    : "Add someone using the form to get started."}
                </p>
                {query && (
                  <button className="text-button" onClick={() => setQuery("")}>
                    Clear search
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
      <footer>
        <span>Form Studio · React &amp; TypeScript</span>
        <span>Your browser. Your directory.</span>
      </footer>
    </div>
  );
}
