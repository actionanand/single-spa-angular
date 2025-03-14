export interface Todo {
  title: string;
  isDone: boolean;
  editing?: boolean;
}

export interface TodoParcelData {
  data: Todo | null;
  event: string;
  message: string;
}
