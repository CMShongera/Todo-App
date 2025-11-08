"use client"

import type { Todo } from "@/types"
import { TodoItem } from "./TodoItem"
import { CheckCircle2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { deleteTodo } from "@/api/todoApi"
import TodoSkeleton from "./TodoSkeleton"

interface TodoListProps {
    todos: Todo[]
    loading?: boolean
    toggleTodo: (id: string, completed: boolean) => void
    handleEditClick: (todo: Todo) => void
    handleAddClick: () => void
    refetchTodos: () => void
}

const TodoList = ({ todos, toggleTodo, handleEditClick, handleAddClick, loading, refetchTodos }: TodoListProps) => {

    const [deletingId, setDeletingId] = useState<string | null>(null)

    const removeTodo = async (id: string) => {
        try {
            setDeletingId(id)
            await new Promise(resolve => setTimeout(resolve, 3000)) // 10s delay
            await deleteTodo(id)
            toast.error("Todo deleted successfully.")
            refetchTodos() // refresh
        } catch {
            toast.error("Failed to delete todo.")
        } finally {
            setDeletingId(null)
        }
    }

    if (loading) {
        return (
            <div className="space-y-3">
                {/* Skeleton placeholders for loading state */}
                <div className="space-y-3 animate-pulse">
                    {[...Array(4)].map((_, i) => (
                        <TodoSkeleton key={i} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {todos.length > 0 ? (
                todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={() => toggleTodo(todo.id, todo.completed)}
                        onEdit={() => handleEditClick(todo)}
                        onDelete={() => removeTodo(todo.id)}
                        deleteTodoLoading={deletingId === todo.id}
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="mb-4 p-3 bg-muted rounded-full">
                        <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
                    <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                        You're all caught up! Add your first task to get started on your productivity journey.
                    </p>
                    <Button onClick={handleAddClick} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add your first task
                    </Button>
                </div>
            )}
        </div>
    )
}

export default TodoList
