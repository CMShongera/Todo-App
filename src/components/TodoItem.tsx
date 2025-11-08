"use client"

import { Button } from "@/components/ui/button"
import { Edit3, Loader2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Todo } from "@/types"
import { Checkbox } from "@/components/ui/checkbox"

interface TodoItemProps {
    todo: Todo
    deleteTodoLoading?: boolean
    onToggle: (id: string) => void
    onEdit: (todo: Todo) => void
    onDelete: (id: string) => void
}

export function TodoItem({ todo, deleteTodoLoading, onToggle, onEdit, onDelete }: TodoItemProps) {
    return (
        <div className="flex flex-row items-start md:items-center gap-4 p-4 bg-card rounded-xl border border-border">
            <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggle(todo.id)}
                className="rounded-full w-6 h-6 border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
                <span
                    className={cn(
                        "text-foreground font-medium text-base md:text-lg block truncate",
                        todo.completed && "line-through text-muted-foreground"
                    )}
                    title={todo.title}
                >
                    {todo.title}
                </span>

                <p
                    className={cn(
                        "text-muted-foreground text-sm leading-relaxed mt-2 md:mt-1 break-words whitespace-pre-wrap max-w-full",
                        todo.completed && "line-through text-muted-foreground"
                    )}
                    style={{ maxHeight: "6rem", overflow: "auto" }}
                    aria-label="todo-description"
                >
                    {todo.description}
                </p>
            </div>

            <div className="flex items-center gap-2 mt-3 md:mt-0 md:ml-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(todo)}
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    aria-label="edit-todo"
                >
                    <Edit3 className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(todo.id)}
                    className="h-8 w-8 text-muted-foreground group hover:text-destructive"
                    aria-label="delete-todo"
                >
                    {deleteTodoLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    )
}
