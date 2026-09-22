export type User = { id: string; username: string; age: number };
export type AddUserFormProps = {
  onAddUser: (username: string, age: number) => string | undefined;
  editingUser?: User;
  onCancel?: () => void;
};
