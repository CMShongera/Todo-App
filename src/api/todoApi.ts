import mockTodos from "../data/mockData";


export const fetchTodos = async () => {
    return [...mockTodos]
};

export const createTodo = async (title: string, description: string) => {
    const createdTodo = { id: crypto.randomUUID(), title, description, completed: false, createdAt: new Date() };
    mockTodos.push(createdTodo);
    return createdTodo;
};

export const updateTodo = async (id: string, title: string, description: string, completed: boolean, createdAt: Date) => {
    const updatedTodo = { id, title, description, completed, createdAt };
    const index = mockTodos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        mockTodos[index] = { ...mockTodos[index], ...updatedTodo };
        return mockTodos[index];
    }
    throw new Error("Todo not found");
};

export const deleteTodo = async (id: string) => {
    const index = mockTodos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        mockTodos.splice(index, 1);
        return true;
    }
    throw new Error("Todo not found");
};

export const toggleTodoCompletion = async (id: string) => {
    const todo = mockTodos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        return todo;
    }
    throw new Error("Todo not found");
};