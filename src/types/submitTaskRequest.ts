export interface SubmitTaskRequest {
  tg?: boolean,
  task_id: number;
  user_id: number;
  value: number;
  user_answer: string;
}
