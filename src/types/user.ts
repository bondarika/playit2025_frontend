import { Prize } from "./prize";

export interface User {
  id: number;
  username: string;
  telegram_id: number;
  balance: number;
  role: string;
  done_tasks: number[];
  group_number: string;
  full_name: string;
  prizes: Prize[];
}
