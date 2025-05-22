export interface User {
  name: string;
  avatar?: string;
}

export interface Notification {
  id: number;
  message: string;
  title?: string;
  is_read: boolean;
  created_at: string;
  user: User;
  redirect_url?: string;
}
