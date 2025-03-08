export interface UserData {
  id: number;
  username: string;
  // data_check_string: string,
  // hash: string,
}

export interface User {
  id: number;
  username: string;
  telegram_id: number;
  balance: number;
  role: string;
  done_tasks: number[];
  group_number: number;
  name: string;
}
