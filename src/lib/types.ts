export type User = {
  id: number;
  username: string;
  email: string;
};

export type ActionData = {
  type: 'success' | 'failure' | 'error';
  data?: { user?: { id: number; username: string; email: string }; token?: string; error?: string };
};