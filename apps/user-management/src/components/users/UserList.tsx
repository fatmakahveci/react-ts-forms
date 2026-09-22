import Icon from "@form-studio/ui/icon";
import type { User } from "@/shared/types";
export default function UserList({
  users,
  onEdit,
  onDelete,
}: {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}) {
  return (
    <ul className="user-list" aria-label="People">
      {users.map((user) => (
        <li key={user.id} className="user-row">
          <span
            className={`avatar avatar-${user.username.charCodeAt(0) % 4}`}
            aria-hidden="true"
          >
            {user.username
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </span>
          <div className="user-info">
            <strong>{user.username}</strong>
            <span>{user.age} years old</span>
          </div>
          <div className="row-actions">
            <button
              className="text-button"
              onClick={() => onEdit(user)}
              id={`edit-${user.id}`}
              aria-label={`Edit ${user.username}`}
            >
              <Icon name="edit" />
              Edit
            </button>
            <button
              className="text-button danger"
              onClick={() => onDelete(user)}
              aria-label={`Delete ${user.username}`}
            >
              <Icon name="trash" />
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
