export interface User {
  id: number;
  username: string;
  telegram_id: number;
  balance: number;
  role: string;
  done_tasks: number[];
  group_number: number;
  full_name: string;
}
