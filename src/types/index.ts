export interface Todo {
    id: string;          // unique identifier (e.g. uuid)
    title: string;       // the task description
    description: string; // detailed info about the task
    completed: boolean;  // whether the task is done
    createdAt: Date;     // when it was added
}
